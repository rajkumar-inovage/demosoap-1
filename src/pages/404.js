import React from "react";

import SEO from "../components/seo";

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
      <br/><br/>
    <div class="d-flex justify-content-center align-items-center my-5" id="main">
        <h1 class="mr-3 pr-3 align-top border-right inline-block align-content-center">404</h1>
        <div class="inline-block align-middle">
          <h2 class="font-weight-normal lead" id="desc">The page you requested was not found.</h2>
          <span>Please try using our search to find the right page</span>
        </div>
    </div>
      <br/><br/>
  </>
);

export default NotFoundPage;
