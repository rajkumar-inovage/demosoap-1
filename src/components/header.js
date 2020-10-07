/* eslint-disable */
import React, { useContext, useState, useEffect } from "react";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import $ from "jquery";
import StoreContext from "~/context/store";
import logo from "../assets/img/demosoap-logo_x100.png";
import stickyLogo from "../assets/img/demosoap-logo_x70.png";
import {
  Container,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
} from "reactstrap";

const countQuantity = (lineItems) => {
  let quantity = 0;

  lineItems.forEach((item) => {
    quantity = quantity + item.quantity;
  });
  return quantity;
};

const Header = ({ siteTitle }) => {
  const isBrowser = typeof window !== "undefined";
  const context = useContext(StoreContext);
  const { removeLineItem, client, checkout } = context;
  const [tncAgree, agreeTNC] = useState(false);
  const getLineItemTotal = (quantity, variantPrice) => {
    const lineItemTotal = quantity * variantPrice;
    return lineItemTotal.toFixed(2);
  };
  const handleRemove = (event, lineItemId) => {
    event.preventDefault();
    removeLineItem(client, checkout.id, lineItemId);
  }; 
  const handleCheckout = () => {
    window.open(checkout.webUrl);
  };
  const lineItems = checkout.lineItems;
  const subtotalPrice = checkout.subtotalPrice;
  useEffect(() => { 
    if (isBrowser) {
      $(window).scroll(function() {
        var sticky = $(".sticky"),
          scroll = $(window).scrollTop();

        if (scroll >= 150) sticky.addClass("sticky-show");
        else sticky.removeClass("sticky-show");
      });
    }
  }, [checkout]);

  const [quantity, setQuantity] = useState(
    countQuantity(checkout ? checkout.lineItems : [])
  );
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setQuantity(countQuantity(checkout ? checkout.lineItems : []));
  }, [checkout]);

  const openSearchBar = () => {
    setModal(true);
  };
  const closeSearchBar = () => {
    setModal(false);
  };
  const toggleMiniCart = () => {
    $("#minicart").toggleClass('opened');
  };
  const toggleMobileMenu = () => {
    $("#mobile-menu").toggleClass('opened');
  };
  const agreed = (e) => {
    agreeTNC(e.target.checked);
  };
  const closeNav = () => {
    $("#mobile-menu").removeClass("opened");
  };
  return (
    <>
      <header className="header-main">
        <div
          className="top-header w-100 mb-0 bg-white"
          style={{ zIndex: "99" }}
        >
          <p
            className="text-center josefin-sans primary-color p-2"
            style={{ fontSize: "1rem" }}
          >
            We offer curbside pick-up | Free GTA delivery for orders over $45 |
            We ship all over Canada
          </p>
        </div>
        <Navbar
          light={true}
          expand="lg"
          className="bg-transparent px-3 py-sm-0 default-header pt-0"
        >
          <Container>
            <div className="row no-gutters w-100">
              <div className="col col-p-90 col-lg-p-70 d-flex flex-wrap align-self-center align-items-center justify-content-start order-lg-1">
                <Navbar light={true} expand="lg" className="bg-transparent p-0">
                  <NavbarToggler
                    onClick={toggleMobileMenu}
                    style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
                  />
                  <div className="d-lg-flex w-100">
                    <Nav
                      className="mr-0 ml-auto josefin-sans py-0 w-100 text-left d-none d-lg-block"
                      navbar
                    >
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/essentials/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Essential
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/fragrant/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Fragrant
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/figure/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Figure
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/donut/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Donut
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/bath-bath-bomb/"
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Bath bombs
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/treat/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Treat
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/skin/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Skin
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                            to="/collections/gift/"
                            onClick={closeNav}
                            className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Gift
                        </Link>
                      </NavItem>
                    </Nav>
                  </div>
                </Navbar>
              </div>
              <div className="col col-p-20 d-flex flex-wrap align-self-center align-items-center justify-content-center order-lg-0">
                <Link
                  aria-label={siteTitle}
                  title={siteTitle}
                  className="has-text-black has-text-weight-bold"
                  to="/"
                >
                  <img
                    src={logo}
                    alt=""
                    width="100"
                    height="100"
                    className="img-fluid"
                  />
                </Link>
              </div>
              <div className="col col-md-2 col-lg-1 d-flex flex-wrap align-self-center align-items-center justify-content-end order-lg-2">
                <div className="navbar-end d-block d-lg-flex text-center pb-0">
                  <div className="navbar-item search-icon d-inline-block">
                    <span
                      className="has-text-dark is-size-5"
                      onClick={openSearchBar}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div> 
                  <div className="navbar-item d-inline-block">
                    <button
                      aria-label="Cart"
                      className="btn btn-link d-block px-0 pt-1"
                      onClick={toggleMiniCart}
                    >
                      <i
                        className="fa fa-shopping-cart text-dark"
                        aria-hidden="true"
                        style={{ fontSize: "1.2rem" }}
                      />
                      <span
                        className="position-absolute cart-counter text-dark josefin-sans pl-2"
                        style={{ top: "-3px" }}
                      >
                        {checkout.lineItems.length
                          ? checkout.lineItems.length
                          : ""}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Navbar>
        <Navbar
          light={true}
          expand="lg"
          className="bg-white px-3 py-sm-0 py-md-3 sticky"
        >
          <Container>
            <div className="row no-gutters w-100">
              <div className="col col-p-90 col-lg-p-70 d-flex flex-wrap align-self-center align-items-center justify-content-start order-lg-1">
                <Navbar light={true} className="bg-transparent p-0">
                  <NavbarToggler
                    onClick={toggleMobileMenu}
                    style={{ padding: "0.25rem 0.5rem", fontSize: "1rem" }}
                  />
                  <div className="d-lg-flex w-100">
                    <Nav
                      className="mr-0 ml-auto josefin-sans py-0 w-100 text-left d-none d-lg-block"
                      navbar
                    >
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/essentials/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Essential
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/fragrant/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Fragrant
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/figure/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Figure
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/donut/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Donut
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/bath-bath-bomb/"
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Bath bombs
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/treat/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Treat
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                            to="/collections/skin/"
                            onClick={closeNav}
                            className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Skin
                        </Link>
                      </NavItem>
                      <NavItem className="mx-3 my-0 d-inline-block py-md-3 py-lg-0">
                        <Link
                          to="/collections/gift/"
                          onClick={closeNav}
                          className="space-1 p-sm-0 p-lg-0 p-xl-0 nav-link "
                        >
                          Gift
                        </Link>
                      </NavItem>
                    </Nav>
                  </div>
                </Navbar>
              </div>
              <div className="col col-p-20 d-flex flex-wrap align-self-center align-items-center justify-content-center order-lg-0">
                <Link
                  aria-label={siteTitle}
                  title={siteTitle}
                  className="has-text-black has-text-weight-bold"
                  to="/"
                >
                  <img
                    src={stickyLogo}
                    alt=""
                    width="100"
                    height="100"
                    className="img-fluid"
                  />
                </Link>
              </div>
              <div className="col col-md-2 col-lg-1 d-flex flex-wrap align-self-center align-items-center justify-content-end order-lg-2">
                <div className="navbar-end d-block d-lg-flex text-center pb-0">
                  <div className="navbar-item search-icon d-inline-block">
                    <span
                      className="has-text-dark is-size-5"
                      onClick={openSearchBar}
                    >
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </span>
                  </div>
                  <div className="navbar-item d-inline-block">
                    <button
                      aria-label="Cart"
                      className="btn btn-link d-block px-0 pt-1"
                      onClick={toggleMiniCart}
                    >
                      <i
                        className="fa fa-shopping-cart text-dark"
                        aria-hidden="true"
                        style={{ fontSize: "1.2rem" }}
                      />
                      <span
                        className="position-absolute cart-counter text-dark josefin-sans pl-2"
                        style={{ top: "-3px" }}
                      >
                        {checkout.lineItems.length
                          ? checkout.lineItems.length
                          : ""}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Navbar>
        <div className={` ${modal === true ? "modal is-active" : "modal"}`}>
          <div className="modal-background" onClick={closeSearchBar}></div>
          <div className="modal-content bg-transparent">
            <div className="field">
              <div className="control has-icons-right">
                <form
                  action="/search"
                  method="GET"
                  className="col-10 col-lg-12 mx-auto"
                >
                  <input
                    className="input is-large josefin-sans-sb"
                    name="value"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <span className="icon is-right pr-4">
                    <i className="fa fa-search" aria-hidden="true"></i>
                  </span>
                  <label className="has-text-white w-100 text-center mt-3 josefin-sans-sb">
                    ENTER ↵
                  </label>
                </form>
              </div>
            </div>
          </div>
          <button
            className="modal-close is-large"
            onClick={closeSearchBar}
            aria-label="close"
          ></button>
        </div>
      </header>
      <div id="mobile-menu" className="d-lg-none">
        <div className="mobile-nav__close" onClick={toggleMobileMenu} />
        <div className="mobile__menu-wrapper">
          <nav className="mobile__menu has-ext has-megamenu mm-menu">
            <div className="panels">
              <div className="panel panel_opened panel_has-navbar">
                <div className="navbar">
                  <div className="navbar__close">
                    <div className="close-icon" onClick={toggleMobileMenu} />
                  </div>
                </div>
                <ul className="listitem-0 listview">
                  <li className="listitem">
                    <Link to="/" className="josefin-sans" onClick={closeNav}>
                      <span className="site-nav__link">Home</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/essentials/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Essential</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/fragrant/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Fragrant</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/figure/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Figure</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/donut/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Donut</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/bath-bath-bomb/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Bath bombs</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/treat/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Treat</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                        to="/collections/skin/"
                        className="josefin-sans"
                        onClick={closeNav}
                    >
                      <span className="site-nav__link">Skin</span>
                    </Link>
                  </li>
                  <li className="listitem">
                    <Link
                      to="/collections/gift/"
                      className="josefin-sans"
                      onClick={closeNav}
                    >
                      <span className="site-nav__link">Gift</span>
                    </Link>
                  </li>
                  <li className="listitem-line listitem my-3" />
                  <li className="listitem-3 listitem">
                    <p className="mb-0">
                      <a href="mailto:info@yourwebsite.com" onClick={closeNav}>
                        info@demosoap.com
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="tel:+12(0)12-345-678" onClick={closeNav}>
                      (416) 536-3916
                      </a>
                    </p>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
      <div id="minicart" className="minicart minicart-sidebar flex-column">
        <div className="cart__container align-items-stretch flex-column">
          <div className="cart__heading d-flex align-items-center">
            <div className="cart__close close-icon" onClick={toggleMiniCart} />
          </div>
          <div className="cart__content align-items-stretch flex-column justify-content-between">
            {lineItems.length > 0 ? (
              <ul className="cart__list">
                {lineItems.map((lineItem, index) => (
                  <li
                    key={index}
                    className="cart__item d-flex align-items-center"
                  >
                    <button
                      className="item__remove"
                      onClick={(e) => handleRemove(e, lineItem.id)}
                      title="Remove this product"
                    >
                      ×
                    </button>
                    <span
                      className="item__image"
                      style={{
                        backgroundImage: `url(${lineItem.variant.image.src})`,
                      }}
                    />
                    <div className="item__content d-flex">
                      <div className="item__name">
                        <strong>{lineItem.title}</strong>
                        <span className="item__qty">{`Qty: ${lineItem.quantity}`}</span>
                      </div>
                      <span className="item__amount">
                        <span className="money">{`$${getLineItemTotal(
                          lineItem.quantity,
                          lineItem.variant.price
                        )}`}</span>
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="cart__list">
                <li className="cart__empty">No products in the cart.</li>
                <li className="cart__return">
                  <Link to="/collections">Return To Shop</Link>
                </li>
              </ul>
            )}
            {lineItems.length > 0 && (
              <div className="cart__meta">
                <hr className="cart__rule" />
                <p className="cart__total d-flex flex-wrap align-items-center">
                  <strong>Subtotal</strong>
                  <span className="money price">{`$${subtotalPrice}`}</span>
                </p>
                <div className="cart__actions">
                  <div className="cart__btns d-flex">
                    <Link to="/cart/" className="col-12 col-md-6 btn btn-cart">
                      View cart
                    </Link>
                    <button
                      onClick={handleCheckout}
                      className="col-12 col-md-6 btn-checkout" 
                    >
                      Check out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="minicart__overlay" onClick={toggleMiniCart}>
        <div className="cart__message">
          Free Shipping on All Orders Over $45
        </div>
      </div>
    </>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
