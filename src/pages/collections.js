import React from 'react'
import { Link } from 'gatsby'
import {Container, Row, Col } from 'reactstrap';
import SEO from "~/components/seo"
import AllCollections from "../components/AllCollections"

const Collections = (data) => {

  const schema = {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement":
    [
     {
      "@type": "ListItem",
      "position": 1,
      "item":
      {
       "@id": "https://demosoap.com/collections",
       "name": "Collections"
       }
     },
    ]   
  }
  
  return(
    <>


    <SEO title="Collections" schemaMarkup={schema}/>
    <section className="inner-pages-banner py-100" style={{backgroundColor:'#e7e7e7'}}>
      <Container className="py-0 py-lg-5">
        <Row className="mx-0">
          <Col className="banner-data text-center col-12 mt-5">
            <div className="breadcrump josefin-sans" style={{fontSize:'1.3rem'}}>
              <span> <Link to="/" style={{textDecoration:'none'}} className="text-dark"> Home</Link> </span> / <span>Collections</span>
            </div>
            <div className="collection-title mt-4 d-inline-flex">
                <h1 className="m-0 josefin-sans-b" style={{fontSize:'2.5rem', color:'#000', lineHeight:'24px'}}>Collections</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="py-3 py-lg-5">
        <Container>
            <AllCollections />
        </Container>
    </section>

    </>
     
  )
}


export default Collections