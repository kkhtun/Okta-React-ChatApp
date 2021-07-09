import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// This is almost just a bootstrap Navbar Component with Links changed
const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const history = useHistory();
  if (!authState) return null;

  // Login Logout Functions
  const login = async () => history.push("/login");
  const logout = async () => {
    oktaAuth.signOut();
  };

  // Handle Chatroom redirect based on Auth
  const chatLink = authState.isAuthenticated ? "/protected" : "/login";
  // Hnadle Login/Logout nav link based on Auth
  const button = authState.isAuthenticated ? (
    <div onClick={logout} className="nav-link">
      Logout
    </div>
  ) : (
    <div onClick={login} className="nav-link">
      Login
    </div>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        SuperChat 🔥💬
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav text-center">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={chatLink}>
              Chat
            </Link>
          </li>
          <li className="nav-item">{button}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
