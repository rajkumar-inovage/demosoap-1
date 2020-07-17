const path = require("path");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    author: `Inovexia`,
    title: `Demosoap | Natural Handmade soaps made in our Toronto workshop Est. 2004`,
    description: `Made in Toronto with several years of experience Demosoap has the secret to formulating the perfect soap that cleanses without overly drying and has just the right amount of skin-nourishing natural oils, fragrance and additives. All Demosoaps are certified vegan gluten free kosher hypoallergenic and biodegaradable`,
    short_title: `DEMOSOAP`,
    siteUrl: `https://demosoap.com`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-layout`, 
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        endpoint: process.env.MAILCHIMP_ENDPOINT,
      },
    },
    {
      resolve: `gatsby-plugin-performance-metrics`,
      options: {
        firstPaint: false,
        firstContentfulPaint: true,
        firstInputDelay: true,
        //useLogging: true,
        //useGoogleAnalytics: false
      }
    },
    {
      resolve: `gatsby-plugin-apollo-shopify`,
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
      },
    },
    {
      resolve: "gatsby-plugin-root-import",
      options: {
        "~": path.join(__dirname, "src/"),
      },
    },
    
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        typekit: {
          id: 'nyn5hna',
          families: ['josefin-sans', 'click-clack']
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/img`,
      },
    },
    {
      resolve: "gatsby-source-shopify",
      options: {
        shopName: process.env.SHOP_NAME,
        accessToken: process.env.SHOPIFY_ACCESS_TOKEN,
        verbose: false,
        // paginationSize: 250,
        // includeCollections: ["shop", "content"],
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "Shopify",
    //     fieldName: "shopify",
    //     url: `https://${process.env.SHOP_NAME}.myshopify.com/api/graphql`,
    //     headers: {
    //       "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_ACCESS_TOKEN
    //     }
    //     //refetchInterval: 60
    //   }
    // },
    // {
    //   resolve: `gatsby-source-graphql`,
    //   options: {
    //     typeName: `WPGraphQL`,
    //     fieldName: `wpgraphql`,
    //     url: `${process.env.WORDPRESS_URL}/graphql`,
    //     searchAndReplaceContentUrls: {
    //       sourceUrl: `${process.env.WORDPRESS_URL}`,
    //       replacementUrl: ``
    //     }
    //     // refetchInterval: 60,
    //   }
    // },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Demosoap`,
        short_name: `demosoap`,
        start_url: `/`,
        background_color: `#333`,
        theme_color: `#333`,
        display: `minimal-ui`,
        icon: `src/assets/img/favicon.png`,
      },
    },
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {}, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [], // option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true, // boolean to turn off the default security headers
        mergeLinkHeaders: true, // boolean to turn off the default gatsby js headers
        mergeCachingHeaders: true, // boolean to turn off the default caching headers
        transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
        generateMatchPathRewrites: true, // boolean to turn off automatic creation of redirect rules for client only paths
      },
    }
  ],
};
