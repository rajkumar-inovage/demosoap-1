import { Row, Col } from "reactstrap";
import React, { useContext } from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import StoreContext from "~/context/store";

const Donut = () => {
  const context = useContext(StoreContext);
  const { checkout } = context;

  const { shopifyCollection } = useStaticQuery(
    graphql`
      query {
        shopifyCollection(handle: { eq: "donut" }) {
          title
          handle
          products {
            handle
            title
            description
            priceRange {
              maxVariantPrice {
                amount
                currencyCode
              }
            }
            images {
              altText
              localFile {
                childImageSharp {
                  fluid(maxWidth: 186) {
                    src
                    presentationWidth
                    presentationHeight
                  }
                }
              }
            }
          }
        }
      }
    `
  );
  const getPrice = (price) =>
    Intl.NumberFormat(undefined, {
      currency: checkout.currencyCode ? checkout.currencyCode : "CAD",
      minimumFractionDigits: 2,
      style: "currency",
    }).format(parseFloat(price ? price : 0));

  return (
    <>
      <Row className="mt-3 mt-lg-5 product-layout">
        {shopifyCollection.products ? (
          shopifyCollection.products.map(
            ({ id, title, handle, description, images, priceRange }, index) => {
              let output = null;

              if (index < 4) {
                output = (
                  <Col
                    className="col-12 col-md-6 col-lg-3 mb-3 mb-lg-5"
                    key={index}
                  >
                    <div className="trending-products" key={id}>
                      <Link to={`/products/${handle}/`} className="">
                        <div className="tp-image">
                          {images[0] &&
                            images[0].localFile.childImageSharp.fluid.src && (
                              <img
                                src={
                                  images[0].localFile.childImageSharp.fluid.src
                                }
                                alt={images[0].altText ? images[0].altText : ""}
                                width={
                                  images[0].localFile.childImageSharp.fluid
                                    .presentationWidth
                                }
                                height={
                                  images[0].localFile.childImageSharp.fluid
                                    .presentationHeight
                                }
                              />
                            )}

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
                        <div className="review-and-price d-block mt-3">
                          <span className="star-value d-none w-50 pl-2 pl-lg-3">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                          </span>
                          <span
                            className="price josefin-sans-sb d-inline-block text-right w-100 pr-2 pr-lg-3"
                            style={{ fontSize: "1.2rem" }}
                          >
                            {getPrice(priceRange.maxVariantPrice.amount)}
                          </span>
                        </div>

                        <Link
                          to={`/products/${handle}/`}
                          className="josefin-sans-b mt-2 d-block"
                          style={{ textDecoration: "none" }}
                        >
                          <h3
                            className=""
                            style={{ fontSize: "1.8rem", color: "#000" }}
                          >
                            {title}
                          </h3>
                        </Link>
                      </div>
                    </div>
                  </Col>
                );
              }
              return output;
            }
          )
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </>
  );
};

export default Donut;
