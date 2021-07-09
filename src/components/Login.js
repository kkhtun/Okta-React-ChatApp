import React from "react";
import { Redirect, useHistory } from "react-router-dom";
import OktaSignInWidget from "./OktaSignInWidget";
import { useOktaAuth } from "@okta/okta-react";

const Login = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();

  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
    history.push("/protected");
  };

  const onError = (err) => {
    console.log("error logging in", err);
  };

  if (!authState) return null;

  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/protected" }} />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};
export default Login;
