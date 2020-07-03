import React, { Component } from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import StoreContext, { defaultStoreContext } from "../context/store";
import Header from "../components/header";
import Footer from "../components/Footer";
import "../components/all.sass";
import { navigate } from "@reach/router";

const isBrowser = typeof window !== "undefined";

class Layout extends Component {
  getlocalStorage(value) {
    try {
      return JSON.parse(localStorage.getItem(value));
    } catch (e) {
      return "";
    }
  }
  stripQuotes(a) {
    if (a !== null && a.charAt(0) === '"' && a.charAt(a.length - 1) === '"') {
      return a.substr(1, a.length - 2);
    }
    return a;
  }
  state = {
    store: {
      ...defaultStoreContext,
      customerAccessToken: this.getlocalStorage("customerAccessToken"),
      addVariantToCart: (variantId, quantity) => {
        this.setState((state) => ({
          store: {
            ...state.store,
            adding: true,
          },
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ];

        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then((checkout) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }));
          });
      },
      addVariantToCartAndBuyNow: (variantId, quantity) => {
        this.setState((state) => ({
          store: {
            ...state.store,
            adding: true,
          },
        }));

        const { checkout, client } = this.state.store;
        const checkoutId = checkout.id;
        const lineItemsToUpdate = [
          { variantId, quantity: parseInt(quantity, 10) },
        ];
        return client.checkout
          .addLineItems(checkoutId, lineItemsToUpdate)
          .then((checkout) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout,
                adding: false,
              },
            }));
            navigate(checkout.webUrl);
          });
      },
      removeLineItem: (client, checkoutID, lineItemID) => {
        return client.checkout
          .removeLineItems(checkoutID, [lineItemID])
          .then((resultat) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout: resultat,
              },
            }));
          });
      },
      updateLineItem: (client, checkoutID, lineItemID, quantity) => {
        const lineItemsToUpdate = [
          { id: lineItemID, quantity: parseInt(quantity, 10) },
        ];
        return client.checkout
          .updateLineItems(checkoutID, lineItemsToUpdate)
          .then((resultat) => {
            this.setState((state) => ({
              store: {
                ...state.store,
                checkout: resultat,
              },
            }));
          });
      },
      updateFilterType: (type) => {
        this.setState((state) => ({
          store: {
            ...state.store,
            filteredType: type,
          },
        }));
      },
      updateFilterSort: (sort) => {
        this.setState((state) => ({
          store: {
            ...state.store,
            filteredSort: sort,
          },
        }));
      },
      setValue: (value) => {
        isBrowser &&
          localStorage.setItem("customerAccessToken", JSON.stringify(value));
        this.setState((state) => ({
          store: {
            ...state.store,
            customerAccessToken: value,
          },
        }));
      },
    },
  };
  async initializeCheckout() {
    // Check if card exits already
    const isBrowser = typeof window !== "undefined";
    const existingCheckoutID = isBrowser
      ? this.stripQuotes(localStorage.getItem("shopify_checkout_id"))
      : null;
    const setCheckoutInState = (checkout) => {
      if (isBrowser) {
        localStorage.setItem(
          "shopify_checkout_id",
          JSON.stringify(checkout.id)
        );
      }

      this.setState((state) => ({
        store: {
          ...state.store,
          checkout,
        },
      }));
    };

    const createNewCheckout = () => this.state.store.client.checkout.create();
    const fetchCheckout = (id) => this.state.store.client.checkout.fetch(id);

    if (existingCheckoutID) {
      try {
        const checkout = await fetchCheckout(existingCheckoutID);

        // Make sure this cart hasn’t already been purchased.
        if (!checkout.completedAt) {
          setCheckoutInState(checkout);
          return;
        }
      } catch (e) {
        localStorage.setItem("shopify_checkout_id", null);
      }
    }

    const newCheckout = await createNewCheckout();
    setCheckoutInState(newCheckout);
  }

  componentDidMount() {
    this.initializeCheckout();
  }

  render() {
    const { children } = this.props;

    return (
      <StoreContext.Provider value={this.state.store}>
        <StaticQuery
          query={graphql`
            query SiteTitleQuery {
              site {
                siteMetadata {
                  title
                }
              }
            }
          `}
          render={(data) => (
            <>
              <Header siteTitle={data.site.siteMetadata.title} />
              <div className="child pt-3">{children}</div>
              <Footer />
            </>
          )}
        />
      </StoreContext.Provider>
    );
  }
}
Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;