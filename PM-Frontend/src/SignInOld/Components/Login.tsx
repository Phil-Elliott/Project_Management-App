import React from "react";
import { Link } from "react-router-dom";

export const Login = ({
  login,
  setLogin,
}: {
  login: boolean;
  setLogin: any;
}) => {
  return (
    <div className="content">
      <h2>Welcome Back!</h2>
      <div className="email-input">
        <p>Email address</p>
        <input type="text" />
      </div>
      <div className="password-input">
        <p>Password</p>
        <input type="password" />
      </div>
      <div className="signIn-button">
        <Link to="/dashboard">
          <button>Sign In</button>
        </Link>
        <button
          style={{
            marginLeft: "1rem",
            backgroundColor: "purple",
            borderColor: "purple",
          }}
          onClick={() => setLogin(!login)}
          className="responsive-button"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};
