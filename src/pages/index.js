import React, {useState} from "react";
import SEO from "../components/seo";
import { Link, graphql } from "gatsby";
import ProductList from "../components/recentProduct";
import banner from "../assets/img/demo-soap-toronto.webp";
import shop from "../assets/img/shop.jpg";
import RecentBlogs from "../components/RecentBlogs";
import { 
  Container,
  Row,
  Col,
 
} from 'reactstrap'

const IndexPage = ({ data }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Demosoap",
    "image": "https://demosoap.com/static/demo-d872a531fe014e9c264bb691fc5d0c7c.jpg",
    "@id": "",
    "url": "https://demosoap.com/",
    "telephone": "4165363916",
    "priceRange": "$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "171 E Liberty St",
      "addressLocality": "Toronto",
      "addressRegion": "ON",
      "postalCode": "M6K 3P6",
      "addressCountry": "CA"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 43.6381221,
      "longitude": -79.41815609999999
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "12:00",
      "closes": "19:00"
    },
    "sameAs": [
      "https://www.facebook.com/Demo-Soap-184227641589990",
      "https://twitter.com/demosoap",
      "https://instagram.com/demosoap"
    ]
  }
 
  return (
    <>
      <SEO title="Home" schemaMarkup={schema}/>
      <section className="banner-section">
        <div className="home-banner">
          <Container> 
            <div
              className="home-slider row mx-0"
              style={{ backgroundImage: `url(${banner})` }}
            >
              <div className="slider-content">
              </div>
              
            </div>
          <div className="bg-secondary slider-content-box josefin-sans text-center rounded">
                  <h1 className="clickclack primary-color" style={{ fontSize: "2rem" }}>
                    Handcrafted & locally made!
                  </h1>
                  <div className="slider-inner-content ">
                    <p style={{ fontSize: "1.3rem" }}>
                      We create unique soaps with organic natural and ethical
                      ingredients made in Toronto est.2004
                    </p>
                  </div>
                </div>
          </Container>

        </div>
      </section> 

      <section className="grid-wrapper container my-5"> 

        <div className="grid-boxes a" onClick={(e) => { e.preventDefault(); window.location.href='/collections/essentials/'; }}>
            <h2>Essentials</h2>
            <p>Our collection of daily use soaps that will help rejuvinate your skin</p> 
        </div> 
 
        <div className="grid-boxes b"  onClick={(e) => { e.preventDefault(); window.location.href='/collections/gift/'; }}>
          <h2>Gift Boxes</h2>
          <p>Our soaps make great unique gifts for customers to help brighten up their day, and those around them. </p>
        </div> 
 
        <div className="grid-boxes c" onClick={(e) => { e.preventDefault(); window.location.href='/collections/donut/'; }}>
          <h2>Donut Soaps</h2>
          <p>Donut shaped soaps that smell amazing and look delicious!</p>
        </div> 
 
        <div className="grid-boxes d" onClick={(e) => { e.preventDefault(); window.location.href='/collections/bath-bath-bomb/'; }}>
          <h2>Bath Bombs</h2>
          <p>Indulge and moisturize your skin with our handcrafted bath bomb</p>
        </div> 
 
        <div className="grid-boxes e" onClick={(e) => { e.preventDefault(); window.location.href='/collections/treat/'; }}>
            <h2>Treats</h2>
            <p>Inspired by desserts each piece is absolutely fun and one of a kind.</p>
        </div>
        
        
      </section>


      <section className="mt-3 mt-lg-2">
        <Container>
          <div className="jumbotron text-center py-3 py-lg-5 bg-light" style={{ borderRadius: '10px'}}>
            <h2
              className="clickclack mb-3"
              style={{ fontSize: "2rem", color: "#000" }}
            >
              All our products are:
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
      


      <section className="py-3 py-lg-5">
        <ProductList data={data} />
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
