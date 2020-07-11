//const { createRemoteFileNode } = require("gatsby-source-filesystem");
const path = require(`path`);
/*
exports.createResolvers = ({
  actions,
  cache,
  createNodeId,
  createResolvers,
  store,
  reporter
}) => {
  const { createNode } = actions;
  createResolvers({
    Shopify_Image: {
      imageFile: {
        type: `File`,
        resolve(source, args, context, info) {
          return createRemoteFileNode({
            url: source.originalSrc,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          });
        }
      }
    }
  });
};
*/

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;
  return graphql(`
    {
      allShopifyProduct {
        edges {
          node {
            handle
          }
        }
      }
      allShopifyCollection {
        nodes {
          handle
        }
      }
      allShopifyPage {
        nodes {
          handle
        }
      }
      allShopifyArticle {
        edges {
          node {
            id
            url
            blog {
              url
            }
          }
        }
        totalCount
      }
    }
    `).then(result => {
      result.data.allShopifyCollection.nodes.forEach(({ handle }) => {
      createPage({
        path: `/collections/${handle}/`,
        component: path.resolve(`./src/templates/collectionsPage/index.js`),
        context: {
          // Data passed to context is available
          // in page queries as GraphQL variables.
          handle: handle
        }
      });
    });
    result.data.allShopifyProduct.edges.forEach(({ node }) => {
      const id = node.handle;
      createPage({
        path: `/products/${id}/`,
        component: path.resolve(`./src/templates/ProductPage/index.js`),
        context: {
          id,
        },
      });
    });
    result.data.allShopifyPage.nodes.forEach(({ handle }) => {
      if (handle !== "home") {
        if (handle === "contact-us") {
          createPage({
            path: `/page/${handle}/`,
            component: path.resolve(`./src/templates/InnerPages/contact-us.js`),
            context: {
              handle: handle
            }
          });
        } else {
          createPage({
            path: `/page/${handle}/`,
            component: path.resolve(`./src/templates/InnerPages/index.js`),
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              handle: handle
            }
          });
        }
      }
    });
    result.data.allShopifyArticle.edges.forEach(({ node }) => {
      createPage({
        path: `/blogs/${node.blog.url.split("/").pop()}/${node.url
          .split("/")
          .pop()}/`,
        component: path.resolve(`./src/templates/ArticlePage/index.js`),
        context: {
          // Data passed to context is available
          // in article queries as GraphQL variables.
          id: node.id
        }
      });
    });
  });
};
/*
exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    devtool: "eval-source-map"
  });
};
*/