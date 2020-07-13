import React from "react";
import { graphql, Link } from "gatsby";
import SEO from "~/components/seo";
import ReactHtmlParser from "react-html-parser";
import {
  Container,
  Row,
  Col,
  UncontrolledPopover,
  PopoverBody
} from 'reactstrap'
import {
  FacebookShareButton,
  PinterestShareButton,
  TwitterShareButton,
  FacebookIcon,
  PinterestIcon,
  TwitterIcon
} from "react-share"

const ArticlePage = ({ data }) => {
  return (
    <>
      <SEO title={data.shopifyArticle.title} />
      <section
        className="inner-pages-banner py-100"
        style={{ backgroundColor: "#e7e7e7" }}
      >
        <Container className="py-0 py-lg-5">
          <Row className="mx-0">
            <Col className="banner-data text-center col-12 mt-5">
              <div
                className="breadcrump josefin-sans"
                style={{ fontSize: "1.3rem" }}
              >
                <span>
                  {" "}
                  <Link
                    to="/"
                    style={{ textDecoration: "none" }}
                    className="text-dark"
                  >
                    {" "}
                    Home
                  </Link>
                  <span> / </span>
                  <Link
                    to="/blogs"
                    className="text-decoration-none"
                    style={{ color: "#000" }}
                  >
                    <span>Blogs</span>
                  </Link>
                </span>{" "}
                / <span> {data.shopifyArticle.title}</span>
              </div>
              <div className="collection-title mt-4 d-inline-flex">
                <h1
                  className="m-0 josefin-sans-b"
                  style={{
                    fontSize: "3rem",
                    color: "#000",
                    lineHeight: "24px",
                  }}
                >
                  {data.shopifyArticle.title}
                </h1>
              </div>
              <div className="post-meta mt-3 mt-lg-4">
                <ul className="d-block text-center">
                  <li
                    className="d-inline-block mx-3 josefin-sans-b"
                    style={{ fontSize: "1.3rem" }}
                  >
                    <span className="pr-2 josefin-sans-sb">Posted By</span>
                    {data.shopifyArticle.author.name}
                  </li>
                  <li
                    className="d-inline-block mx-3 josefin-sans-b"
                    style={{ fontSize: "1.3rem" }}
                  >
                    <span className="pr-2 josefin-sans-sb">On</span>
                    {data.shopifyArticle.publishedAt}
                  </li>
                  <li
                    className="d-inline-block mx-3 josefin-sans-b"
                    style={{ fontSize: "1.3rem" }}
                  >
                    <span className="pr-2 josefin-sans-sb">In</span>
                    <Link
                      to="/blogs/"
                      className="pl-2 text-decoration-none text-dark"
                    >
                      Blogs
                    </Link>
                  </li> 
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5 single-blog">
        <Container>
          <Row className="mx-0 py-2 py-lg-5">
            <Col className="col-12">
              <img
                src={
                  data.shopifyArticle.image.localFile.childImageSharp.fluid.src
                }
                alt={data.shopifyArticle.image.altText}
              />
              <div
                className="inner-page-content josefin-sans pt-3"
                style={{ fontSize: "1.3rem" }}
              >
                {ReactHtmlParser(data.shopifyArticle.contentHtml)}
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};
export const query = graphql`
  query($id: String!) {
    shopifyArticle(id: { eq: $id }) {
      shopifyId
      title
      author {
        name
      }
      blog {
        title
        url
        shopifyId
      }
      content
      contentHtml
      excerpt
      image {
        altText
        localFile {
          childImageSharp {
            fluid {
              src
              presentationHeight
              presentationWidth
            }
          }
        }
      }
      publishedAt(formatString: "MMMM DD, YYYY")
    }
  }
`;

export default ArticlePage;
