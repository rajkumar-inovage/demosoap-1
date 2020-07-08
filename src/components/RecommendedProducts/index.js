import React, { useContext } from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Container } from "reactstrap";
import StoreContext from "~/context/store";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const RecommendedProducts = (prop) => {
  const { checkout } = useContext(StoreContext);
  const { shopifyCollection } = useStaticQuery(
    graphql`
      query {
        shopifyCollection(handle: { eq: "recommended-products-seguno" }) {
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
                  fluid {
                    src
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

  const settings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 1000,
    autoplaySpeed: 10000,
    autoplay: true,
    pauseOnHover: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Container>
      <div className="mx-0 mt-5 product-slider">
        <Slider {...settings}>
          {shopifyCollection.products ? (
            shopifyCollection.products.map(
              ({ id, title, handle, images, priceRange }, index) => {
                let output = null;
                if (index < 10) {
                  output = (
                    <div className="mb-3 mb-lg-5" key={index}>
                      <div className="trending-products" key={id}>
                        <Link to={`/product/${handle}/`} className="">
                          <div
                            className="tp-image"
                            style={{
                              backgroundImage: `url(${images[0] &&
                                images[0].localFile.childImageSharp.fluid
                                  .src})`,
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
                          <div className="review-and-price d-block mt-3">
                            <span className="star-value d-none w-50 pl-2 pl-lg-3">
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                              <i className="fa fa-star"></i>
                            </span>
                            <span
                              className="price clickclack d-inline-block text-right w-100 pr-2 pr-lg-3"
                              style={{ fontSize: "1.0rem" }}
                            >
                              {getPrice(priceRange.maxVariantPrice.amount)}
                            </span>
                          </div>
                          <Link
                            to={`/product/${handle}/`}
                            className="clickclack product-name mt-2 d-block"
                            style={{ textDecoration: "none" }}
                          >
                            <h3
                              className=""
                              style={{ fontSize: "1.4rem", color: "#000" }}
                            >
                              {title}
                            </h3>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }
                return output;
              }
            )
          ) : (
            <p>No Products found!</p>
          )}
        </Slider>
      </div>
    </Container>
  );
};

export default RecommendedProducts;
