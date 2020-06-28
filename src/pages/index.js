import React, {useState} from "react";
import SEO from "../components/seo";
import { Link, graphql } from "gatsby";
import ProductList from "../components/recentProduct";
import banner from "../assets/img/first_slide.webp";
import shop from "../assets/img/shop.jpg";
import RecentBlogs from "../components/RecentBlogs";
import Essentials from "../components/CollectionFilter/Essentials";
import BathBomb from "../components/CollectionFilter/BathBombs";
import Donut from "../components/CollectionFilter/Donut";
import s1 from "../assets/img/s1.jpg"
import s2 from "../assets/img/s2.jpg"
import s3 from "../assets/img/s3.jpg"
import s4 from "../assets/img/s4.jpg"
import s1thumb from "../assets/img/s1-thumb.jpg";
import s3thumb from "../assets/img/s3-thumb.jpg";
import s2thumb from "../assets/img/s2-thumb.jpg";
import s4thumb from "../assets/img/s4-thumb.jpg";
import classnames from 'classnames'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col,
 
} from 'reactstrap'

const IndexPage = ({ data }) => {
  const [activeTab, setActiveTab] = useState('1')

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab)
  }
  return (
    <>
      <SEO title="Home" />
      <section className="banner-section">
        <div className="home-banner">
          <Container> 
            <div
              className="home-slider row mx-0"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="slider-content">
                <div className="button-box"></div>
                <div
                  className="bg-secondary slider-content-box josefin-sans text-center p-3 rounded p-lg-4 col-11 col-md-10 col-lg-8 mx-auto position-absolute"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  <h1 className="josefin-sans-b primary-color" style={{ fontSize: "2rem" }}>
                    Handcrafted & locally made!
                  </h1>
                  <div className="slider-inner-content px-4">
                    <p style={{ fontSize: "1.3rem" }}>
                      We create uniquely designed soaps with organic natural and ethical
                      ingredients
                    </p>
                    <div className="btn-box mt-4">
                      <Link
                        className="btn bdr-btn text-uppercase josefin-sans-sb"
                        style={{ fontSize: "1rem", color: "#000" }}
                        to=""
                      >
                        SHOP NOW
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </section>
      <section className="py-3 py-lg-5">
        <ProductList data={data} />
      </section>
      <section className="mt-3 mt-lg-2">
        <Container>
          <div className="jumbotron text-center py-3 py-lg-5 bg-light">
            <h2
              className="josefin-sans-sb mb-3"
              style={{ fontSize: "2rem", color: "#000" }}
            >
              All products are:
            </h2>
            <p
              className="text-uppercase josefin-sans"
              style={{ fontSize: "1.2rem", color: "#000" }}
            >
              VEGAN - GLUTEN FREE - KOSHER - HYPOALLERGENIC - BIODEGRADABLE
            </p>
          </div>
        </Container>
      </section>
      <section className="py-5">
        <Container>
          <Row className="mx-0">
            <div className="w-100">
              <div className="tab-outer d-block d-md-inline-flex w-100">
                <h2
                  className="josefin-sans-sb mb-3 col-12 col-md-5 col-lg-6"
                  style={{ fontSize: "2.5rem", color: "#000" }}
                >
                  Our Collections
                </h2>
                <Nav
                  tabs
                  className="px-0 col-12 col-md-7 col-lg-6 m-0 text-center tab-menu d-block no-border"
                >
                  <NavItem className="d-inline-block">
                    <NavLink
                      className={classnames({ active: activeTab === "1" })}
                      onClick={() => {
                        toggle("1");
                      }}
                      style={{
                        fontSize: "1.7rem",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Essentials
                    </NavLink>
                  </NavItem>
                  <NavItem className="d-inline-block">
                    <NavLink
                      className={classnames({ active: activeTab === "2" })}
                      onClick={() => {
                        toggle("2");
                      }}
                      style={{
                        fontSize: "1.7rem",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Donuts
                    </NavLink>
                  </NavItem>
                  <NavItem className="d-inline-block">
                    <NavLink
                      className={classnames({ active: activeTab === "3" })}
                      onClick={() => {
                        toggle("3");
                      }}
                      style={{
                        fontSize: "1.7rem",
                        textAlign: "center",
                        fontWeight: 600,
                      }}
                    >
                      Bath Bombs
                    </NavLink>
                  </NavItem>
                </Nav>
              </div>
              <TabContent className="pt-3 pt-lg-5" activeTab={activeTab}>
                <TabPane tabId="1">
                  <Essentials />
                </TabPane>
                <TabPane tabId="2">
                  <Donut />
                </TabPane>
                <TabPane tabId="3">
                  <BathBomb />
                </TabPane>
              </TabContent>
            </div>
          </Row>
        </Container>
      </section>
      <section className="py-3 py-lg-5">
        <Container>
          <Row className="mx-0">
            <Col className="col-12 col-lg-4 d-flex align-self-center">
              <div className="visit-us">
                <h3
                  className="josefin-sans-b"
                  style={{ fontSize: "1.4rem", color: "#000" }}
                >
                  Visit Us
                </h3>
                <div
                  className="address josefin-sans"
                  style={{ fontSize: "1.3rem" }}
                >
                  171 E Liberty St, Toronto, Unit #123 <br />
                  ON M6K 3P6
                </div>
                <div
                  className="schedule josefin-sans mt-3 mt-lg-5 d-none"
                  style={{ fontSize: "1.3rem" }}
                >
                  Mon - Fri : 12–7p.m. <br />
                  Sat - Sun 11a.m.–5p.m.
                </div>
                <div className="btn-box mt-4">
                  <Link
                    className="btn bdr-btn text-uppercase josefin-sans-b"
                    style={{ fontSize: "0.8rem", color: "#000" }}
                    to="/page/contact-us/"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </Col>
            <Col className="col-12 col-lg-8">
              <Row className="mx-0">
                <Col
                  className="col-7 follow"
                  style={{ backgroundImage: `url(${shop})` }}
                ></Col>
                <Col className="col-5 pl-3 pl-lg-5 d-flex align-self-center">
                  <div className="follow-us">
                    <h3
                      className="josefin-sans-b p-0"
                      style={{ fontSize: "1.8rem", color: "#000" }}
                    >
                      Follow Our Store On Instagram
                    </h3>
                    <div className="btn-box mt-3 mt-lg-5">
                      <a
                        className="btn bdr-btn text-uppercase josefin-sans-b"
                        style={{ fontSize: "0.8rem", color: "#000" }}
                        href="https://www.instagram.com/demosoap/"
                      >
                        @ DEMOSOAP
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-3 py-lg-5">
        <RecentBlogs />
      </section>
      <section className="pt-3 pt-lg-5">
        <Row className="mx-0">
          <div className="col-12 col-md-6 col-lg-3 position-relative px-0 outer">
            <a href={s1}>
              <img
                src={s1thumb}
                alt=""
                width="341"
                height="341"
                className="m-0"
              />
              <div className="layer">
                <div className="layer-content">
                  <i
                    className="fa fa-play text-white"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 position-relative px-0 outer">
            <a href={s2}>
              <img
                src={s2thumb}
                alt=""
                width="341"
                height="341"
                className="m-0"
              />
              <div className="layer">
                <div className="layer-content">
                  <i
                    className="fa fa-instagram text-white"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 position-relative px-0 outer">
            <a href={s3}>
              <img
                src={s3thumb}
                alt=""
                width="341"
                height="341"
                className="m-0"
              />
              <div className="layer">
                <div className="layer-content">
                  <i
                    className="fa fa-instagram text-white"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </div>
              </div>
            </a>
          </div>
          <div className="col-12 col-md-6 col-lg-3 position-relative px-0 outer">
            <a href={s4}>
              <img
                src={s4thumb}
                alt=""
                width="341"
                height="341"
                className="m-0"
              />
              <div className="layer">
                <div className="layer-content">
                  <i
                    className="fa fa-instagram text-white"
                    style={{ fontSize: "1.3rem" }}
                  ></i>
                </div>
              </div>
            </a>
          </div>
        </Row>
      </section>
    </>
  );
};

export default IndexPage;

export const query = graphql`
  query {
    allShopifyProduct(limit: 8, skip: 1) {
      edges {
        node {
          id
          title
          handle
          createdAt(fromNow: true)
          publishedAt
          productType
          vendor
          priceRange {
            maxVariantPrice {
              amount
            }
          }
          images {
            originalSrc
            id
            localFile {
              childImageSharp {
                fluid(maxWidth: 186) {
                  ...GatsbyImageSharpFluid_noBase64
                }
              }
            }
          }
          variants {
            id
            title
            price
          }
        }
      }
    }
  }
`;
