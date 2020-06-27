import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import ReactHtmlParser from 'react-html-parser'
import SEO from '~/components/seo'

const Blogs = () => {
  const MAX_LENGTH = 200
  const { allShopifyArticle } = useStaticQuery(
    graphql`
      query {
        allShopifyArticle(
          sort: { order: DESC, fields: publishedAt }
          
        ) {
          edges {
            node {
              id
              title
              excerpt
              url
              blog {
                url
              }
              content
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
  )
  return (
    <>
<SEO title="Blogs"/>
    <section className="inner-pages-banner py-100" style={{backgroundColor:'#e7e7e7'}}>
      <Container className="py-0 py-lg-5">
        <Row className="mx-0">
          <Col className="banner-data text-center col-12 mt-5">
            <div className="breadcrump josefin-sans" style={{fontSize:'1.3rem'}}>
              <span> <Link to="/" style={{textDecoration:'none'}} className="text-dark"> Home</Link> </span> / <span>Blogs</span>
            </div>
            <div className="collection-title mt-4 d-inline-flex">
                <h1 className="m-0 josefin-sans-b" style={{fontSize:'2.5rem', color:'#000', lineHeight:'24px'}}>Blogs</h1>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className="py-3 py-lg-5">
    <Container>
        
        <Row className="mx-0 mt-3 mt-lg-5 mb-5">
           
            <Col className="col-12 col-md-8 col-lg-9" >
            {allShopifyArticle.edges ? (
                        allShopifyArticle.edges.map(
                        ({
                            node: {
                            id,
                            url,
                            blog,
                            title,
                            content,
                            excerpt,
                            publishedAt,
                            image,
                            },
                        }) => (
                <Row className="mx-0 mb-5" key={id}>
                <div className="recent-posts position-relative col-12 col-md-4">
                    <Link
                        className="d-block"
                        to={`/blogs/${blog.url.split('/').pop()}/${url
                                .split('/')
                                .pop()}/`}
                            >
                        
                        <img src={image && image.localFile && image.localFile.childImageSharp.fluid.src} className="img-fluid" alt="" />
                    </Link>
                </div>
                <div className="recent-posts-data col-12 col-md-8" style={{transition:'all 0.3s',}}>
                    <div className="mb-0">
                    <Link
                        to={`/blogs/${blog.url.split('/').pop()}/${url
                        .split('/')
                        .pop()}/`}
                        style={{ fontSize: '2rem', color: '#000', lineHeight:'2.3rem'}}
                        className="josefin-sans-sb d-block mb-0 text-decoration-none"
                    >
                        {title}
                    </Link>
                    </div>
                    <div className="m-0 josefin-sans" style={{fontSize:'1.3rem'}}>
                        {ReactHtmlParser(content.substring(0, MAX_LENGTH))}...
                    </div>
                    <div className="read-more-btn">
                    <Link
                        className="d-block josefin-sans-b mt-3"
                        to={`/blogs/${blog.url.split('/').pop()}/${url.split('/').pop()}/`}
                        style={{color:'#000', fontSize:'1.5rem'}}>
                        Read More...
                    </Link>
                    </div>
                </div> 
                </Row>   
                   )
                   )
               ) : (
                   <p>No Products found!</p>
               )}
            </Col>
         
            <Col className="col-12 col-md-4 col-lg-3">
            </Col>
        </Row>
    </Container>
    </section>
    </>
  )
}

export default Blogs
