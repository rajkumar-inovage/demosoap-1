import SEO from "~/components/seo";
import { Container, Row, Col } from "reactstrap";
import React, { useContext, useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { graphql, Link } from "gatsby";
import StoreContext from "~/context/store";

import GridIcon from "~/components/grid-icon";
import ListIcon from "~/components/list-icon";

import fragrantBg from '../../assets/img/fragrance.jpg';
import essentialsBg from '../../assets/img/essentials.jpg';
import figuresBg from '../../assets/img/figures.jpg';
import donutsBg from '../../assets/img/donuts.jpg';
import bathBg from '../../assets/img/bathbomb.jpg';
import treatsBg from '../../assets/img/treats.jpg';
import giftBg from '../../assets/img/gifts.jpg';


const CollectionsPage = ({ data }) => {
  const context = useContext(StoreContext);
  const { checkout } = context;
  const MAX_LENGTH = 100;
  const productsPerPage = 8;
  const [showProducts, setShowProducts] = useState(productsPerPage);
  const [gridClass, setGridClass] = useState("col-md-4");
  const [imgClass, setImgClass] = useState("col-md-12");
  const [cntClass, setCntClass] = useState("col-md-12");
  const [displayClass, setDisplayClass] = useState("d-unset");
  const [descClass, setDescClass] = useState("d-none");
  const [rowpriceClass, setRowpriceClass] = useState("d-inline-block");
  const [addcartClass, setAddcartClass] = useState("d-block");
  const [sort, setSort] = useState("featured");
  const products = data.shopifyCollection.products;
  const buttonClasses =
    "btn-link bg-transparent border-0 text-decoration-none text-body p-0";

  let categoryBg;
  let bgColor;

  const title = data.shopifyCollection.title;
  if (title == "Fragrant") { 
    categoryBg = fragrantBg;
    bgColor = "#eeeff3";
  } else if (title == "Essentials") {
    categoryBg = essentialsBg;
    bgColor = "#f3f3f3";
  } else if (title == "Figures") {
    categoryBg = figuresBg;
    bgColor = "#f3f3f3";
  } else if (title == "Donuts") {
    categoryBg = donutsBg;
    bgColor = "#eeeeee";
  } else if (title == "Bath Bombs") {
    categoryBg = bathBg;
    bgColor = "#f7f6f4";
  } else if (title == "Treat") {
    categoryBg = treatsBg;
    bgColor = "#eae6e6";
  } else if (title == "Gift") {
    categoryBg = giftBg;
    bgColor = "#f1f1ef";
  }
  const compared = (price) => {
    if (price) {return('CA'+price)}
  }
  
  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "CAD",
      minimumFractionDigits: 2,
      style: "currency",
    }).format(parseFloat(price ? price : 0));
  const toggleGrid = (event, size) => {
    event.preventDefault();
    if (size === 1) {
      setGridClass("col-md-12 one-col");
      setCntClass("col-md-9");
      setDisplayClass("d-flex");
      setDescClass("d-flex");
      setImgClass("col-md-3");
      setRowpriceClass("d-none");
      setAddcartClass("d-none");
    }
    if (size === 2) {
      setGridClass("col-md-6");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
    if (size === 3) {
      setGridClass("col-md-4");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
    if (size === 4) {
      setGridClass("col-md-3");
      setCntClass("col-md-12");
      setDisplayClass("d-unset");
      setDescClass("d-none");
      setImgClass("col-md-12");
      setRowpriceClass("d-inline-block");
      setAddcartClass("d-block");
    }
  };
  useEffect(() => {
    //context.updateFilterSort(sort);
  }, [context, sort]);
  const sorts = [
    {
      value: "featured",
      title: "Featured",
    },
    {
      value: "A-Z",
      title: "Alphabetically, A-Z",
    },
    {
      value: "Z-A",
      title: "Alphabetically, Z-A",
    },
    {
      value: "low",
      title: "Price, low to high",
    },
    {
      value: "high",
      title: "Price, high to low",
    }
  ];
  const reSortB = (e) => {
    e.preventDefault();
  }
  const reSort = (e) => {
    e.preventDefault();
    setSort(e.target.value);
  };
  const loadMoreProducts = () => {
    setTimeout(() => {
      setShowProducts(showProducts + productsPerPage);
    }, 1500);
  };

  return (
    <>
      <SEO title={data.shopifyCollection.title} />
      <section
        className="collection-banner py-100"
        style={{
          backgroundColor: bgColor,
          backgroundImage: `url(${categoryBg})`,
        }}
      >
        <div className="mobile-bg"></div>
        <Container className="py-0 ">
          <Row className="mx-0">
            <Col className="banner-data text-center col-12">
              <div
                className="breadcrump clickclack-light"
                style={{ fontSize: "1em" }}
              >
                <Link
                  to="/"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  <span>Home</span>
                </Link>
                <span> / </span>
                <Link
                  to="/collections"
                  className="text-decoration-none"
                  style={{ color: "#000" }}
                >
                  <span>Collections</span>
                </Link>
                <span> / </span>
                <span>{data.shopifyCollection.title}</span>
              </div>
              <div className="collection-title mt-4 d-inline-flex">
                <Link
                  to="/collections"
                  className="text-decoration-none d-none d-lg-block mt-n1"
                  style={{ color: "#000" }}
                >
                  <i
                    className="fa fa-long-arrow-left"
                    style={{ fontSize: "1.8rem" }}
                  ></i>
                </Link>
                <h1
                  className="m-0 clickclack"
                  style={{
                    fontSize: "2.5rem",
                    color: "#000",
                    lineHeight: "24px",
                  }}
                >
                  {data.shopifyCollection.title}
                </h1>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5">
        <Container>
          <Row className="mx-0">
            <Col className="col-6 d-none d-lg-block">
              <button
                onClick={(e) => toggleGrid(e, 1)}
                className={buttonClasses}
              >
                <ListIcon />
              </button>
              <button
                onClick={(e) => toggleGrid(e, 2)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">2</sup>
              </button>
              <button
                onClick={(e) => toggleGrid(e, 3)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">3</sup>
              </button>
              <button
                onClick={(e) => toggleGrid(e, 4)}
                className={buttonClasses + " ml-3"}
              >
                <GridIcon />
                <sup className="ml-1">4</sup>
              </button>
            </Col>
            <Col className="col-6 text-right">
              <label
                htmlFor="sortBy"
                className="has-text-weight-semibold is-uppercase"
                style={{ margin: "-20px" }}
              >
                <div className="field">
                  <div className="control">
                    <div className="select">
                      <select
                        defaultValue={sort}
                        onChange={(e) => reSort(e)}
                        onBlur={(e) => reSortB(e)}
                        id="sortBy"
                      >
                        {sorts.map(({ value, title }, index) => (
                          <option
                            key={index}
                            value={value}
                            className="josefin-sans"
                          >
                            {title}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </label>
            </Col>
          </Row>
          <div className="mt-3 mt-lg-5">
            {products.length ? (
              <InfiniteScroll
                className="product-layout row"
                pageStart={0}
                loadMore={loadMoreProducts}
                hasMore={products.length >= showProducts}
                loader={
                  <div className="col-12 text-center" key={products.length}>
                    <div
                      className="spinner-grow"
                      role="status"
                      threshold="450"
                      style={{
                        width: "3rem",
                        height: "3rem",
                      }}
                    >
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                }
              >
                {products
                  .slice(0, showProducts)
                  .map(
                    (
                      { title, handle, description, images, variants },
                      index
                    ) => (
                      <div
                        key={index}
                        className={gridClass + " mb-3 mb-lg-5 gridProduct"}
                      >
                        <div className={displayClass + " trending-products"}>
                          <div className={imgClass + " productImage"}>
                            <Link to={`/products/${handle}/`} className="">
                              <div className="tp-image">
                                {images.length &&
                                  images[0].localFile.childImageSharp.original
                                    .src && (
                                    <img
                                      src={
                                        images[0].localFile.childImageSharp
                                          .original.src
                                      }
                                      alt={images[0].altText}
                                      className="img-fluid"
                                      width={
                                        images[0].localFile.childImageSharp
                                          .original.width
                                      }
                                      height={
                                        images[0].localFile.childImageSharp
                                          .original.height
                                      }
                                    />
                                  )}

                                <div className="add-to-cart d-inline w-auto p-0">
                                  <button
                                    className={
                                      addcartClass +
                                      " josefin-sans-b cart-btn border border-dark btns position-relative"
                                    }
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    Add To Cart
                                  </button>
                                </div>
                              </div>
                            </Link>
                          </div>
                          <div className={cntClass}>
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
                                  className={
                                    rowpriceClass +
                                    " price  text-right clickclack w-100 pr-2 pr-lg-3"
                                  }
                                  style={{ fontSize: "1.2rem", color: "#4e4e4e" }}
                                >
                                  
                                <span className="clickclack style-1 collectionPrice"> <del>{compared(variants[0].compareAtPrice)}</del> </span>
                                 {getPrice(variants[0].price)}
                                </span>
                              </div>

                              <Link
                                to={`/products/${handle}/`}
                                className="clickclack d-block product-name"
                                style={{ textDecoration: "none" }}
                              >
                                <h3 className="" style={{ color: "#4e4e4e" }}>
                                  {title}
                                </h3>
                              </Link>
                              <div className={descClass}>
                                <span
                                  className="price josefin-sans-b d-inline-block text-left w-50 pr-2 pr-lg-3"
                                  style={{ fontSize: "1.2rem", color: "#4e4e4e" }}
                                >
                                  {getPrice(variants[0].price)}
                                </span>
                              </div>
                              <div className={descClass + " p-desc"}>
                                <div className="desc-p col-12 col-lg-9 px-0">
                                  <p
                                    className="josefin-sans"
                                    style={{ fontSize: "1.2rem" }}
                                  >
                                    {description.substring(0, MAX_LENGTH)}...
                                  </p>
                                  <Link
                                    to={`/products/${handle}/`}
                                    className="more josefin-sans-sb text-decoration-none position-relative"
                                    style={{
                                      fontSize: "1.3rem",
                                      color: "#4e4e4e",
                                    }}
                                  >
                                    More
                                  </Link>
                                </div>
                                <div
                                  className="atc text-center col-12 col-lg-3 px-0"
                                  style={{ minWidth: "150px" }}
                                >
                                  <Link
                                    to={`/products/${handle}/`}
                                    className="text-decoration-none px-3 py-3 d-block josefin-sans-b cart-btn border border-dark btns position-relative"
                                    style={{ fontSize: "0.8rem" }}
                                  >
                                    ADD TO CART
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  )}
              </InfiniteScroll>
            ) : (
              <p>No Products found!</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
};
export const query = graphql`
  query($handle: String!) {
    shopifyCollection(handle: { eq: $handle }) {
      title
      handle
      products {
        handle
        title
        description
        images {
          altText
          localFile {
            childImageSharp {
              original {
                width
                src
                height
              }
            }
          }
        }
        variants {
          price
          compareAtPrice
        }
        priceRange {
          maxVariantPrice {
            amount
            currencyCode
          }
        }
      }
    }
  }
`;

export default CollectionsPage;
