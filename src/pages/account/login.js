import React, { useState, useContext } from "react";
import SEO from "../../components/seo";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import StoreContext from "../../context/store";
import ConnexionLayout from "../../components/account/ConnexionLayout";
import { Link } from "gatsby";

const CUSTOMER_LOGIN = gql`
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const CUSTOMER_PASSWORD_RESET = gql`
  mutation customerRecover($email: String!) {
    customerRecover(email: $email) {
      customerUserErrors {
        code
        field
        message
      }
    }
  }
`;

const LoginForm = () => {
  const { setValue } = useContext(StoreContext);
  const [passwordForgot, setPasswordForgot] = useState(false);

  const [email, setEmail] = useState("");
  const [emailReset, setEmailReset] = useState("");

  const [messsageInfo, setMessageInfo] = useState("");

  const [password, setPassword] = useState(null);
  const handleCustomerAccessToken = (value) => {
    setValue(value);
  };

  return (
    <>
      {passwordForgot ? (
        <section className="hero is-fullheight-with-navbar" style={{backgroundColor:'#e7e7e7'}}>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-centered">
                  <h2 className=" title has-text-centered josefin-sans-b">
                    RESET YOUR PASSWORD
                  </h2>
                  <p className="josefin-sans text-center">We will send you an email to reset your password.</p>
                  <Mutation mutation={CUSTOMER_PASSWORD_RESET}>
                    {(customerRecover) => {
                      return (
                        <>
                        <div className="col-12 col-md-6 col-lg-4 mx-auto" >
                          <div className="field mt-5">
                            <label
                              className="label text-dark josefin-sans-b"
                              htmlFor="loginEmail"
                            >
                              Email
                            </label>
                            <div className="control">
                              <input
                                className="input josefin-sans"
                                type="email"
                                aria-label="Email"
                                id="loginEmail"
                                onChange={(e) => setEmailReset(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <div className="control has-text-centered">
                              <button
                                className="button text-center josefin-sans-b overflow-hidden py-3 px-5 cart-btn border border-dark btns position-relative text-uppercase text-center"
                                onClick={() => {
                                  customerRecover({
                                    variables: {
                                      email: emailReset,
                                    },
                                  }).then(() => {
                                    setMessageInfo(
                                      "We've sent you an email with a link to update your password."
                                    );
                                    setPasswordForgot(false);
                                  });
                                }}
                              >
                                SUBMIT
                              </button>
                            </div>
                            <div className="field text-center mt-3">
                              <button
                                className="control has-text-centered josefin-sans-b"
                                onClick={(e) =>
                                  setPasswordForgot(!passwordForgot)
                                }
                              >
                                <span>Cancel</span>
                              </button>
                            </div>
                          </div>
                          </div>
                        </>
                      );
                    }}
                  </Mutation>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="hero is-fullheight-with-navbar" style={{backgroundColor:'#e7e7e7'}}>
          <div className="hero-body">
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-4 is-centered">
                  {messsageInfo && (
                    <div className="notification is-success">{messsageInfo}</div>
                  )}
                  <h2 className=" title has-text-centered josefin-sans-b">Login</h2>
                  <Mutation mutation={CUSTOMER_LOGIN}>
                    {(customerLogin) => {
                      return (
                        <>
                          <div className="field">
                            <label
                              className="label text-dark josefin-sans-b"
                              htmlFor="loginEmail"
                            >
                              Email
                            </label>
                            <div className="control">
                              <input
                                className="input josefin-sans"
                                type="email"
                                aria-label="Email"
                                id="loginEmail"
                                onChange={(e) => setEmail(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="field">
                            <label
                              className="label text-dark josefin-sans-b"
                              htmlFor="loginPassword"
                            >
                              Password
                            </label>
                            <div className="control">
                              <input
                                className="input josefin-sans"
                                type="password"
                                aria-label="Password"
                                id="loginPassword"
                                onChange={(e) => setPassword(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="field text-center">
                            <button
                              className="control has-text-centered"
                              onClick={(e) =>
                                setPasswordForgot(!passwordForgot)
                              }
                            >
                              <span>Forgot your password? </span>
                            </button>
                          </div>
                          <div className="field">
                            <div className="control has-text-centered">
                              <button
                                className="button josefin-sans-b overflow-hidden py-3 px-5 cart-btn border rounded-none out-line-none border-dark btns position-relative text-uppercase text-center"
                                onClick={() => {
                                  customerLogin({
                                    variables: {
                                      input: {
                                        email: email,
                                        password: password,
                                      },
                                    },
                                  })
                                    .then((result) => {
                                      handleCustomerAccessToken(
                                        result.data.customerAccessTokenCreate
                                          .customerAccessToken
                                      );
                                    })
                                    .catch((err) => {
                                      alert(err);
                                    });
                                }}
                              >
                                SIGN IN
                              </button>
                            </div>
                          </div>
                          <div className="field">
                            <div className="control has-text-centered">
                              <Link to="/account/register">
                                <p className="text-dark josefin-sans-b">Create account</p>
                              </Link>
                            </div>
                          </div>
                        </>
                      );
                    }}
                  </Mutation>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

const Login = () => {
  return (
    <>
      <SEO title="Login" />
      <ConnexionLayout log={false}>
        <LoginForm />
      </ConnexionLayout>
    </>
  );
};

export default Login;