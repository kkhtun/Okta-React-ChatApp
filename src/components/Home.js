import React from "react";

const Home = () => {
  var email = "";
  if (localStorage.getItem("okta-token-storage")) {
    email = JSON.parse(localStorage.getItem("okta-token-storage")).idToken
      .claims.email;
  }

  return (
    <div className="home-wrapper text-white">
      <h1>Welcome to the ChatRoom</h1>
      {email && (
        <h4 className="text-secondary">
          - {email.substr(0, email.indexOf("@"))} -
        </h4>
      )}
      <p>Please Log In to continue to the room</p>
    </div>
  );
};
export default Home;
