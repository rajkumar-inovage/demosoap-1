import React, { useContext } from "react";
import { Link } from "gatsby"; /* eslint-disable */
import { Container, Row, Col } from "reactstrap";
import StoreContext from "~/context/store";

const ProductBox = props => {
  const { checkout } = useContext(StoreContext);
  const product = props.product;
  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "CAD",
      minimumFractionDigits: 2,
      style: "currency",
    }).format(parseFloat(price ? price : 0));
  return (
    <Col className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-5">
      <div className="trending-products" key={product.node.id}>
        <Link to={`/products/${product.node.handle}`}>
          <div
            className="tp-image"
            style={{
              backgroundImage: `url(${product.node.images[0] &&
                product.node.images[0].localFile &&
                product.node.images[0].localFile.childImageSharp.fluid.src})`
            }}
          >
            <div className="add-to-cart d-inline w-auto p-0">
              <button
                className="josefin-sans-b cart-btn border border-dark btns position-relative"
                style={{ fontSize: "0.8rem" }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </Link>
        <div className="tp-details">
          <div className="review-and-price d-block mt-3 clickclack">
            <span className="star-value d-none w-50 pl-2 pl-lg-3">
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
              <i className="fa fa-star"></i>
            </span>
            <span
              className="price clickclack d-inline-block text-right w-100 pr-2 pr-lg-3"
              style={{ fontSize: "1.2rem" }}
            >
              {getPrice(product.node.variants[0].price)}
            </span>
          </div>
          <Link
            to={`/products/${product.node.handle}`}
            className="clickclack mt--2 d-block"
            style={{ textDecoration: "none" }}
          >
            <h3 className="" style={{ fontSize: "1.6rem", fontWeight: 400, color: "#000" }}>
              {product.node.title}
            </h3>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default ProductBox;
