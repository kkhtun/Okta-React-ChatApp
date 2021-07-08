import React from "react";
import { Route, useHistory, Switch } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { oktaAuthConfig, oktaSignInConfig } from "./config/okta-config";

// Import Own Components
import Navbar from "./components/layouts/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Protected from "./components/Protected";
import Footer from "./components/layouts/Footer";
const oktaAuth = new OktaAuth(oktaAuthConfig);

const AppWithRouterAccess = () => {
  const history = useHistory();

  const customAuthHandler = () => {
    history.push("/login");
  };

  const restoreOriginalUri = async (_oktaAuth, originalUri) => {
    history.replace(toRelativeUrl(originalUri || "/", window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      onAuthRequired={customAuthHandler}
      restoreOriginalUri={restoreOriginalUri}
    >
      <Navbar />
      <Switch>
        <main className="container">
          <Route path="/" exact={true} component={Home} />
          <SecureRoute path="/protected" component={Protected} />
          <Route
            path="/login"
            render={() => <Login config={oktaSignInConfig} />}
          />
          <Route path="/login/callback" component={LoginCallback} />
        </main>
      </Switch>
      <Footer />
    </Security>
  );
};
export default AppWithRouterAccess;
