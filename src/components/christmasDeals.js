import React from 'react'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { Container, Row, Col } from 'reactstrap'
import ProductBox from './productBox'

const ChristmasDeals = () => {
  const data = useStaticQuery(
      graphql`
        query {
          allShopifyProduct(
            filter: { tags: { eq: "christmas" } }
            limit: 8
            skip: 1
          ) {
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
      `
    ),
    { edges: products } = data.allShopifyProduct
  return (
    <Container>
      <Row className='m-0 text-center'>
        <h2
          className='clickclack w-100 mb-2'
          style={{ fontSize: '2.5rem', color: '#000' }}
        >
          Christmas Deals
        </h2>
      </Row>
      <Row className='mx-0 mt-5 homepage-products'>
        {data.allShopifyProduct ? (
          products.map((p, i) => {
            let product = p
            return <ProductBox key={i} product={product} />
          })
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </Container>
  )
}
export default ChristmasDeals
