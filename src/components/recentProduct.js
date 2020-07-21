import React from "react";
import ProductBox from "./productBox";
import { Container, Row } from "reactstrap";

const ProductList = ({ data }) => {
  const { edges: products } = data.allShopifyProduct;

  return (
    <Container>
      <Row className="m-0 text-center">
        <h2
          className="josefin-sans-sb w-100 mb-2"
          style={{ fontSize: "2.5rem", color: "#000" }}
        >
          Trending Products
        </h2>
        <p className="josefin-sans w-100" style={{ fontSize: "1.4rem" }}>
          What our customers are in love with right now
        </p>
      </Row>
      <Row className="mx-0 mt-5 homepage-products">
        {data.allShopifyProduct ? (
          products.map((p, i) => {
            let product = p;
            return <ProductBox key={i} product={product} />;
          })
        ) : (
          <p>No Products found!</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductList;
