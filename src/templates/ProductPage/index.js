import React, { useState, useEffect, useCallback } from "react";
import { graphql, Link } from "gatsby";
import PropTypes from "prop-types";
import Img from "gatsby-image";
import { Box } from "rebass";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
  Alert,
  UncontrolledPopover,
  PopoverBody,
} from "reactstrap";
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon,
} from "react-share";
import atob from "atob";
import classnames from "classnames";
import ReactHtmlParser from "react-html-parser";
import ProductForm from "~/components/ProductForm";
import AddToCompare from "~/components/AddToCompare";
import RecommendedProducts from "~/components/RecommendedProducts";
import SEO from "~/components/seo";

const ProductPage = ({ data }) => {
  const product = data.shopifyProduct;
  const shopName = "demo-soap.myshopify.com";
  const [shopID, setShopID] = useState();
  const productID = parseInt(
    atob(product.shopifyId)
      .split("/")
      .pop()
  );
  const productHandle = product.handle;
  const productTitle = product.title;
  const productImg = product.images.length ? product.images[0].originalSrc : "";
  const currentImage = product.images[0];
  const [activeTab, setActiveTab] = useState("1");
  const [responseColor, setResponseColor] = useState("");
  const [responseContent, setResponseContent] = useState(false);
  const [responseVisible, setResponseVisible] = useState(false);
  const [responseErrorVisible, setResponseErrorVisible] = useState(false);
  const showReviews = 5;
  const [avgRating, setAvgRating] = useState(0);
  const [ratingData, setRatingData] = useState([]);
  const [productRating, setProductRating] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const dismissResponse = () => {
    setResponseVisible(false);
    setResponseContent(false);
  };
  const dismissErrorResponse = () => {
    setResponseErrorVisible(false);
    setResponseContent(false);
  };
  const response = (
    <Alert
      className="rounded-0"
      isOpen={responseVisible}
      toggle={dismissResponse}
      color={responseColor}
    >
      {responseContent}
    </Alert>
  );
  const response_Error = (
    <Alert
      className="rounded-0"
      isOpen={responseErrorVisible}
      toggle={dismissErrorResponse}
      color={responseColor}
    >
      {responseContent}
    </Alert>
  );
  const getDate = (date) => {
    const Months = "January_February_March_April_May_June_July_August_September_October_November_December".split(
      "_"
    );
    const msec = Date.parse(date);
    const d = new Date(msec);
    const month = Months[d.getMonth()];
    const day = d.getDate();
    const year = d.getFullYear();
    return `${month} ${day}, ${year}`;
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const fetchAllRating = useCallback(
    async (URL) => {
      const res = await fetch(URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      res
        .json()
        .then((responseJson) => {
          const allRating = responseJson.data;
          let sum = 0;
          allRating.forEach(function(v) {
            sum += v.rating;
          });
          setTotalRating(allRating.length);
          setAvgRating((sum / allRating.length).toFixed(2));
          setRatingData(allRating);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    []
  );
  const fetchShopID = useCallback(
    async (URL) => {
      const res = await fetch(URL);
      res
        .json()
        .then((responseJson) => {
          setShopID(responseJson.data.shopify_id);
          fetchAllRating(
            `//reviews.hulkapps.com/api/shop/${responseJson.data.shopify_id}/reviews/all?product_id=${productID}`
          );
        })
        .catch((error) => {
          console.error(error);
        });
    },
    [productID, fetchAllRating]
  );
  useEffect(() => {
    fetchShopID(`//reviews.hulkapps.com/api/shop?shopify_domain=${shopName}`);
  }, [product, productID, fetchShopID]);
  const mouseOverRating = (event, selectedButton) => {
    event.preventDefault();
    const buttons = document.querySelectorAll(".rating-starts button");
    for (let i = 0; i <= selectedButton; i++) {
      buttons[i].firstChild.classList.remove("fa-star-o");
      buttons[i].firstChild.classList.add("fa-star");
    }
  };
  const mouseLeaveRating = (event, selectedButton) => {
    event.preventDefault();
    if (productRating === 0) {
      const buttons = document.querySelectorAll(".rating-starts button");
      for (let i = 0; i <= selectedButton; i++) {
        buttons[i].firstChild.classList.remove("fa-star");
        buttons[i].firstChild.classList.add("fa-star-o");
      }
    }
  };
  const changeRating = (event, selectedButton) => {
    event.preventDefault();
    const spans = document.querySelectorAll(".rating-starts button span");
    spans.forEach((span) => {
      span.classList.remove("fa-star");
      span.classList.add("fa-star-o");
    });
    const buttons = document.querySelectorAll(".rating-starts button");
    for (let i = 0; i <= selectedButton; i++) {
      buttons[i].firstChild.classList.remove("fa-star-o");
      buttons[i].firstChild.classList.add("fa-star");
    }
    setProductRating(selectedButton + 1);
  };
  const submitReview = (event) => {
    event.preventDefault();
    const reviewForm = event.target;
    const elements = event.target.elements;
    const data = {
      author: elements.author.value,
      email: elements.email.value,
      rating: parseInt(elements.rating.value),
      title: elements.title.value,
      body: elements.body.value,
      shopify_id: elements.shopify_id.value,
      product_id: parseInt(elements.product_id.value),
      product_handle: elements.product_handle.value,
      product_title: elements.product_title.value,
      product_image: elements.product_image.value,
    };
    const sendReview = async (URL) => {
      return await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-requested-with": "XMLHttpRequest",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((responseJson) => {
              setResponseVisible(true);
              setResponseColor("success");
              setResponseContent(
                <div>
                  {responseJson.message}
                  <strong>&nbsp;successfully</strong>.
                </div>
              );
              reviewForm.reset();
              setProductRating(0);
              const spans = document.querySelectorAll(
                ".rating-starts button span"
              );
              spans.forEach((span) => {
                span.classList.remove("fa-star");
                span.classList.add("fa-star-o");
              });
            });
          } else if (response.status === 422) {
            response.json().then((responseJson) => {
              setResponseErrorVisible(true);
              setResponseColor("warning");
              setResponseContent(
                <>
                  <strong> {responseJson.message}</strong>{" "}
                  <ul className="mb-0 pl-4">
                    {" "}
                    {Object.keys(responseJson.errors).map((error) => (
                      <li key={error}>{responseJson.errors[error][0]}</li>
                    ))}{" "}
                  </ul>
                </>
              );
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    };
    sendReview(`//reviews.hulkapps.com/api/shop/${shopID}/reviews`);
  };
  
  return (
    <>
      <SEO title={product.title} description={product.description} />
      <section className="inner-pages-banner ">
        <Container>
          <Row className="mx-0 pt-3 pt-lg-5">
            <Col className="col-12 col-md-6 pdt-image">
              <Box
                style={{ margin: "auto", marginTop: "0", boxShadow: "none" }}
                className="img-hover-zoom--zoom-n-rotate img-hover-zoom"
              >
                <Img
                  fluid={currentImage.localFile.childImageSharp.fluid}
                  key={currentImage.localFile.id}
                  alt={product.title}
                  className=""
                />
              </Box>
              {product.images.map((image) => (
                <Img
                  className="d-none"
                  fluid={image.localFile.childImageSharp.fluid}
                  key={image.id}
                  alt={product.title}
                />
              ))}
            </Col>
            <Col className="col-12 col-md-6 pl-3 pl-lg-5">
              <div className="single-product-details pl-lg-5">
                <div className="title-and-share d-flex">
                  <h1 className="josefin-sans-b p-0 m-0 flex-grow-1">
                    {product.title}
                  </h1>
                  <div className="text-right p-0 m-0">
                    <button
                      id="share"
                      style={{
                        color: "rgba(0,0,0,0.4)",
                      }}
                      className="bg-transparent border-0 outline-none ml-0 ml-sm-0 ml-lg-4 ml-xl-4"
                    >
                      <span style={{ color: "#000" }}>
                        <i className="fa fa-share-alt"></i>
                      </span>
                    </button>
                    <UncontrolledPopover
                      placement="left"
                      trigger="legacy"
                      target="share"
                    >
                      <PopoverBody>
                        <FacebookShareButton url={URL} className="p-1">
                          <FacebookIcon size={25} round={true} />
                        </FacebookShareButton>
                        <TwitterShareButton url={URL} className="p-1">
                          <TwitterIcon size={25} round={true} />
                        </TwitterShareButton>
                        <PinterestShareButton url={URL} className="p-1">
                          <PinterestIcon size={25} round={true} />
                        </PinterestShareButton>
                      </PopoverBody>
                    </UncontrolledPopover>
                  </div>
                </div>
                <div className="reviews font-1rem d-flex my-3 my-lg-4">
                  <ul
                    className="list-unstyled p-0 m-0 d-block"
                    title={
                      avgRating > 0 ? `${avgRating} out of 5` : `No Reviews`
                    }
                  >
                    <li className="d-inline-block">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="d-inline-block">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="d-inline-block">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="d-inline-block">
                      <i className="fa fa-star-o"></i>
                    </li>
                    <li className="d-inline-block">
                      <i className="fa fa-star-o"></i>
                    </li>
                  </ul>
                  <span className="josefin-sans pl-3">
                    {avgRating > 0
                      ? totalRating > 1
                        ? `${totalRating} rating`
                        : `${totalRating} ratings`
                      : `No Reviews`}
                  </span>
                </div>
                <ProductForm product={product} />
                <AddToCompare
                  className="row align-items-center"
                  product={product}
                  rating={
                    avgRating > 0 ? `${avgRating} out of 5` : `No Reviews`
                  }
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="mt-5">
            <div className="w-100">
              <Nav
                tabs
                className="px-0 w-100 m-0 text-center tab-menu d-block no-border"
              >
                <NavItem className="d-inline-block">
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                    style={{
                      fontSize: "2rem",
                      textAlign: "center", 
                      fontWeight: 600,
                    }}
                  >
                    Description
                  </NavLink>
                </NavItem>
                <NavItem className="d-inline-block">
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                    style={{
                      fontSize: "2rem",
                      textAlign: "center", 
                      fontWeight: 600,
                    }}
                  >
                    Reviews
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent className="pt-3 pt-lg-5" activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col sm="12">
                      <div
                        className="josefin-sans"
                        style={{ fontSize: "1.3rem" }}
                      >
                        {ReactHtmlParser(product.descriptionHtml)}
                      </div>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row>
                    <Col
                      sm="6"
                      className="px-3 px-lg-5 border border-left-0 border-top-0 border-bottom-0"
                    >
                      <h2 className="spr-header-title josefin-sans-b">
                        Customer Reviews
                      </h2>
                      {ratingData.length ? (
                        <ul className="list-unstyled d-inline-block p-0 mb-0 ratings">
                          {ratingData
                            .slice(0, showReviews)
                            .map((review, index) => (
                              <li className="border mb-4" key={index}>
                                <h4
                                  className="color-primary erbaum-bold text-uppercase"
                                  style={{
                                    fontSize: "16px",
                                  }}
                                >
                                  {review.product_title}
                                </h4>
                                <div
                                  className="d-inline-block br-widget br-readonly pt-2"
                                  title={"Rating: " + review.rating}
                                >
                                  {[...Array(review.rating)].map((elem, i) => (
                                    <button
                                      data-rating-value={i}
                                      data-rating-text={i}
                                      className={
                                        review.rating - 1 === i
                                          ? "p-0 border-0 bg-transparent p-0 border-0 bg-transparent"
                                          : "br-selected p-0 border-0 bg-transparent p-0 border-0 bg-transparent"
                                      }
                                      key={i}
                                    >
                                      <span className="color-primary fa fa-star"></span>
                                    </button>
                                  ))}
                                  <div className="br-current-rating d-none">
                                    {review.rating}
                                  </div>
                                </div>
                                <p
                                  className="filson-pro-reg pt-2"
                                  style={{
                                    fontSize: "14px",
                                  }}
                                >
                                  <b className="color-primary">
                                    {review.author}–
                                  </b>
                                  {getDate(review.created_at)}
                                </p>
                                <p className="filson-pro-reg text-1 color-secondary mb-0 pb-0">
                                  {review.body}
                                </p>
                              </li>
                            ))}
                        </ul>
                      ) : (
                        <div className="spr-summary">
                          <span className="spr-summary-caption josefin-sans-sb">
                            No reviews yet
                          </span>
                        </div>
                      )}
                    </Col>
                    <Col sm="6" className="px-3 px-lg-5">
                      <form
                        encType="multipart/form-data"
                        onSubmit={(e) => submitReview(e)}
                        className="josefin-sans"
                      >
                        <h3
                          className="josefin-sans-b"
                          style={{ color: "#000" }}
                        >
                          Write a Review
                        </h3>
                        <div className="form-row">
                          <div className="col-12 form-group">
                            {response}
                            {response_Error}
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-12 form-group">
                            <label
                              className="josefin-sans-b"
                              style={{ color: "#000", fontSize: "1.1rem" }}
                              htmlFor="author"
                            >
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-0"
                              name="author"
                              id="author"
                              aria-label="Name"
                              placeholder="Enter your name"
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-12 form-group">
                            <label
                              className="josefin-sans-b"
                              style={{ color: "#000", fontSize: "1.1rem" }}
                              htmlFor="email"
                            >
                              Email
                            </label>
                            <input
                              type="email"
                              className="form-control rounded-0"
                              name="email"
                              id="email"
                              aria-label="Email"
                              placeholder="john.smith@example.com"
                              required={true}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-12 form-group">
                            <label
                              className="josefin-sans-b"
                              style={{ color: "#000", fontSize: "1.1rem" }}
                              htmlFor="rating"
                            >
                              Rating:&nbsp;{productRating}&nbsp;
                            </label>
                            <div className="rating-starts d-inline">
                              {[...Array(5)].map((elem, i) => (
                                <button
                                  key={i}
                                  className="p-0 border-0 bg-transparent p-0 border-0 bg-transparent outline-none"
                                  onMouseOver={(e) => mouseOverRating(e, i)}
                                  onFocus={(e) => mouseOverRating(e, i)}
                                  onMouseLeave={(e) => mouseLeaveRating(e, i)}
                                  onBlur={(e) => mouseLeaveRating(e, i)}
                                  onClick={(e) => changeRating(e, i)}
                                >
                                  <span
                                    className="fa fa-star-o"
                                    style={{ color: "#F5CA59" }}
                                  ></span>
                                </button>
                              ))}
                            </div>
                            <input
                              type="hidden"
                              name="rating"
                              aria-label="Rating"
                              value={productRating}
                            />
                          </div>
                        </div>

                        <div className="form-row">
                          <div className="col-12 form-group">
                            <label
                              className="josefin-sans-b"
                              style={{ color: "#000", fontSize: "1.1rem" }}
                              htmlFor="title"
                            >
                              Review Title
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-0"
                              id="title"
                              name="title"
                              aria-label="Review Title"
                              placeholder="Give your review a title"
                              required={true}
                            />
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-sm-12 form-group">
                            <label
                              className="josefin-sans-b"
                              style={{ color: "#000", fontSize: "1.1rem" }}
                              htmlFor="body"
                            >
                              Body of Review
                            </label>
                            <textarea
                              className="form-control rounded-0"
                              name="body"
                              id="body"
                              placeholder="Write your comments here"
                              rows="10"
                              aria-label="Body of Review"
                              required={true}
                              style={{
                                resize: "none",
                              }}
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-row">
                          <div className="col-sm-12">
                            <input
                              type="hidden"
                              name="shopify_id"
                              aria-label="shopify_id"
                              value={shopID}
                            />
                            <input
                              type="hidden"
                              name="product_id"
                              aria-label="product_id"
                              value={productID}
                            />
                            <input
                              type="hidden"
                              name="product_handle"
                              aria-label="product_handle"
                              value={productHandle}
                            />
                            <input
                              type="hidden"
                              name="product_title"
                              aria-label="product_title"
                              value={productTitle}
                            />
                            <input
                              type="hidden"
                              name="product_image"
                              aria-label="product_image"
                              value={productImg}
                            />
                            <button
                              type="submit"
                              className="josefin-sans-b py-2 px-4 cart-btn border border-dark btns position-relative text-uppercase"
                              style={{ fontSize: "0.9rem" }}
                            >
                              SUBMIT REVIEW
                            </button>
                          </div>
                        </div>
                      </form>
                    </Col>
                  </Row>
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </Container>
      </section>
      <section className="border border-left-0 border-right-0 py-3 py-lg-4 mt-5">
        <Container>
          <Row className="mx-0 text-center">
            <p
              className="josefin-sans-sb w-100 text-center"
              style={{ fontSize: "1.2rem" }}
            >
              <strong style={{ color: "#000" }}>Categories: </strong>
              <Link
                to="/collections/fragrant/"
                className="text-decoration-none text-dark px-1"
              >
                Fragrant
              </Link>
              ,
              <Link
                to="/collections/recommended-products-seguno/"
                className="text-decoration-none text-dark px-1"
              >
                Recommended products
              </Link>
              ,
              <Link
                to="/collections/new/"
                className="text-decoration-none text-dark px-1"
              >
                Trending
              </Link>
            </p>
          </Row>
        </Container>
      </section>
      <section className="mt-5">
        <Container>
          <Row className="mx-0">
            <h2
              className="josefin-sans-b w-100 text-center"
              style={{ color: "#000", fontSize: "2.8rem" }}
            >
              We also recommend
            </h2>
            <RecommendedProducts />
          </Row>
        </Container>
      </section>
    </>
  );
};
ProductPage.propTypes = {
  addVariantToCart: PropTypes.func,
};
export default ProductPage;

export const query = graphql`
         query($id: String!) {
           shopifyProduct(handle: { eq: $id }) {
             handle
             id
             title
             handle
             productType
             description
             descriptionHtml
             shopifyId
             options {
               id
               name
               values
             }
             variants {
               id
               title
               price
               availableForSale
               shopifyId
               sku
               weight
               weightUnit
               presentmentPrices {
                 edges {
                   node {
                     price {
                       currencyCode
                       amount
                     }
                   }
                 }
               }
               selectedOptions {
                 name
                 value
               }
             }
             priceRange {
               minVariantPrice {
                 amount
                 currencyCode
               }
               maxVariantPrice {
                 amount
                 currencyCode
               }
             }
             images {
               originalSrc
               id
               localFile {
                 childImageSharp {
                   fluid(maxWidth: 910) {
                     ...GatsbyImageSharpFluid_noBase64
                   }
                 }
               }
             }
           }
         }
       `;
