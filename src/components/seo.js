/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

function SEO({ description, lang, meta, title, schemaMarkup }) {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription = description || site.siteMetadata.description;

  return (
    <Helmet
      htmlAttributes={{
        lang
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription
        },
        {
          property: `og:title`,
          content: title
        },
        {
          property: `og:url`,
          content: 'https://demosoap.com/'
        },
        {
          property: `og:image`,
          content: 'https://demosoap.com/static/demo-d872a531fe014e9c264bb691fc5d0c7c.jpg'
        },
        {
          property: `og:description`,
          content: metaDescription
        },
        {
          property: `og:type`,
          content: `website`
        },
        {
          name: `twitter:card`,
          content: `summary`
        },
        {
          name: `twitter:creator`,
          content: 'Demosoap'
        },
        {
          name: `twitter:image`,
          content: 'https://demosoap.com/static/demo-d872a531fe014e9c264bb691fc5d0c7c.jpg'
        },
        {
          name: `twitter:site`,
          content: 'https://demosoap.com/'
        },
        {
          name: `twitter:title`,
          content: 'Demosoap | Unique natural handmade soaps'
        },
        {
          name: `twitter:description`,
          content: metaDescription
        }
      ].concat(meta)}
    >
      {schemaMarkup && 
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
      }
    </Helmet>
  );
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired
};

export default SEO;
