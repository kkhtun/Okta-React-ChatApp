import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
// This is almost just a bootstrap Navbar Component with Links changed
const Navbar = () => {
  const history = useHistory();
  const { oktaAuth, authState } = useOktaAuth();

  if (!authState) return null;

  // Login Logout Functions
  const login = async () => history.push("/login");
  const logout = async () => {
    history.push("/");
    oktaAuth.signOut();
  };

  const chatLink = authState.isAuthenticated ? (
    <Link to="/protected" className="nav-link">
      Chat
    </Link>
  ) : (
    <Link to="/login" className="nav-link">
      Chat
    </Link>
  );

  const button = authState.isAuthenticated ? (
    <Link onClick={logout} className="nav-link">
      Logout
    </Link>
  ) : (
    <Link onClick={login} className="nav-link">
      Login
    </Link>
  );
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Python SuperChat 🔥💬
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
          <li className="nav-item">{chatLink}</li>
          <li className="nav-item">{button}</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
