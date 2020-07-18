import React, { useState, useContext, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import StoreContext from "~/context/store";
import VariantSelectors from "~/components/variantSelectors"

const ProductForm = ({ product }) => {
  const {
    variants: [initialVariant],
    priceRange: { minVariantPrice },
  } = product;
  const MAX_LENGTH = 200;
  const variant = { ...initialVariant };
  const [quantity, setQuantity] = useState(1);
  const [variantP, setVariant] = useState(product.variants[0]);
  const {
    addVariantToCart,
    addVariantToCartAndBuyNow,
    client,
    //checkout,
  } = useContext(StoreContext);
  const productVariant =
    client.product.helpers.variantForOptions(product, variant) || variant;
  const [available, setAvailable] = useState(productVariant.availableForSale);
  const price = Intl.NumberFormat(undefined, {
    currency: minVariantPrice.currencyCode,
    minimumFractionDigits: 2,
    style: "currency",
  }).format(variant.price);

  const compareAtPrice = () => {
    if (variant.compareAtPrice) {
      return('CA'+variant.compareAtPrice)
    };
  }
  

  //checkout.currencyCode = productVariant.presentmentPrices.edges[1].node.price.currencyCode;
  const checkAvailability = useCallback(
    (productId) => {
      client.product.fetch(productId).then((fetchedProduct) => {
        // this checks the currently selected variant for availability
        const result = fetchedProduct.variants.filter(
          (variant) => variant.id === productVariant.shopifyId
        );
        if (result.length > 0) {
          setAvailable(result[0].available);
        }
      });
    },
    [client.product, productVariant.shopifyId]
  );

  useEffect(() => {
    checkAvailability(product.shopifyId);
  }, [productVariant, checkAvailability, product.shopifyId]);


  useEffect(() => {
    let defaultOptionValues = {}
    product.options.forEach(selector => {
        defaultOptionValues[selector.name] = selector.values[0]
    })
    setVariant(defaultOptionValues)
  }, [])

  const handleOptionChange = event => {
    const { target } = event
    setVariant(prevState => ({
        ...prevState,
        [target.name]: target.value,
        ...console.log(variantP)
    }))
  }

  const decreaseQuantity = (event) => {
    event.preventDefault();
    let qnty = quantity;
    if (qnty > 1) {
      setQuantity(qnty - 1);
    }
  };
  const increaseQuantity = (event) => {
    event.preventDefault();
    let qnty = quantity;
    setQuantity(qnty + 1);
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    addVariantToCart(productVariant.shopifyId, quantity);
  };
  const handleBuyNow = () => {
    addVariantToCartAndBuyNow(productVariant.shopifyId, quantity);
  };
  return (
    <>

    <div className="style-1">
      <del>
        <span className="clickclack amount">{compareAtPrice()}</span>
      </del>
      <ins>
      <h3 className="clickclack amount product-price">{price}</h3>
      </ins>
    </div>
  <span className="weight">Weight: {productVariant.weight} <span style={{ textTransform : 'lowercase'}}>{productVariant.weightUnit}</span></span>
      <p className="josefin-sans mt-3 mb-5">
        {product.description.substring(0, MAX_LENGTH)}&hellip;
      </p>
      {
          product.options.map(options => (
              <VariantSelectors
                  onChange={handleOptionChange}
                  key={options.id.toString()}
                  options={options}
              />
          ))
      }
      <div className="row align-items-center">
        <div className="col-auto select-qnty">
          <button
            type="button"
            onClick={(e) => decreaseQuantity(e)}
            aria-label="decreaseQuantity"
            className="ris ri-minus minus"
          />
          <span className="quantity-input josefin-sans-b">{quantity}</span>
          <button
            type="button"
            onClick={(e) => increaseQuantity(e)}
            aria-label="increaseQuantity"
            className="ris ri-plus plus"
          ></button>
        </div>
        <div className="col-auto">
          <button
            type="submit"
            onClick={(e) => handleAddToCart(e)}
            className="josefin-sans-b py-3 px-5 cart-btn border border-dark btns position-relative text-uppercase"
            id="add2cart"
            style={{ fontSize: "0.8rem" }}
          >
            Add to Cart
          </button>
        </div>
        <div className="buy-it-now col-12">
          <button
            className="josefin-sans-b w-100 mt-3 mt-lg-5 py-3 px-4"
            style={{
              fontSize: "0.9rem",
              color: "#000",
              backgroundColor: "#ffcc33",
              border: "1px solid #ffcc33",
              transition: "all 0.3s",
            }}
            onClick={handleBuyNow}
          >
            BUY IT NOW
          </button>
        </div>
      </div>
      {!available && <p>This Product is out of Stock!</p>}
    </>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    descriptionHtml: PropTypes.string,
    handle: PropTypes.string,
    id: PropTypes.string,
    shopifyId: PropTypes.string,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        originalSrc: PropTypes.string,
      })
    ),
    options: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        values: PropTypes.arrayOf(PropTypes.string),
      })
    ),
    productType: PropTypes.string,
    title: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        availableForSale: PropTypes.bool,
        id: PropTypes.string,
        price: PropTypes.string,
        title: PropTypes.string,
        shopifyId: PropTypes.string,
        selectedOptions: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
  }),
  addVariantToCart: PropTypes.func,
};

export default ProductForm;
