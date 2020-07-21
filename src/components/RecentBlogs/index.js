import React from "react";
import { useStaticQuery, graphql, Link } from "gatsby";
import { Container, Row, Col } from "reactstrap";

const RecentBlogs = () => {
  const { allShopifyArticle } = useStaticQuery(
    graphql`
      query {
        allShopifyArticle(
          sort: { order: DESC, fields: publishedAt }
          limit: 4
        ) {
          edges {
            node {
              title
              url
              blog {
                url
              }
              publishedAt(formatString: "MMM DD, YYYY")
              image {
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
              author {
                name
              }
            }
          }
        }
      }
    `
  );
  return (
    <Container>
      <Row className="m-0 text-center">
        <h2
          className="josefin-sans-b w-100 mb-2"
          style={{ fontSize: "2.5rem", color: "#000" }}
        >
          Our Blogs
        </h2>
      </Row>
      <Row className="mx-0 mt-3 mt-lg-5">
        {allShopifyArticle.edges ? (
          allShopifyArticle.edges.map(
            (
              { node: { url, blog, title, publishedAt, image } },
              index
            ) => (
              <Col className="col-12 col-md-6 col-lg-3" key={index}>
                <div className="recent-posts position-relative">
                  <span
                    className="position-absolute publish-date p-1 josefin-sans-b bg-white border"
                    style={{
                      fontSize: "12px",
                      top: "25px",
                      left: "-10px",
                      zIndex: "8",
                    }}
                  >
                    {publishedAt}
                  </span>
                  <Link
                    className="d-block"
                    to={`/blogs/${blog.url.split("/").pop()}/${url
                      .split("/")
                      .pop()}/`}
                  >
                    <div
                      className="recent-post-image"
                      style={{
                        backgroundImage: `url(${image.localFile.childImageSharp.fluid.src})`,
                        height: "200px",
                        WebkitBackgroundSize: "cover",
                        backgroundRepeat: "no-repaet",
                        backgroundPosition: "center",
                        transition: "all 0.3s",
                      }}
                    ></div>
                  </Link>
                  <div
                    className="recent-posts-data"
                    style={{ transition: "all 0.3s" }}
                  >
                    <p className="mb-0">
                      <Link
                        to={`/blogs/${blog.url.split("/").pop()}/${url
                          .split("/")
                          .pop()}/`}
                        style={{ fontSize: "1.2rem", color: "#000" }}
                        className="josefin-sans-sb d-block mb-0 px-2 mt-3 mb-3 text-decoration-none"
                      >
                        {title}
                      </Link>
                    </p>
                  </div>
                </div>
              </Col>
            )
          )
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </Container>
  );
};
export default RecentBlogs;
