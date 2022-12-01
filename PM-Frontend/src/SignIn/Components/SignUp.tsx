import React, { useState } from "react";

const SignUp = ({ login, setLogin }: { login: boolean; setLogin: any }) => {
  return (
    <div className="content">
      <h2>Lets Get Started!</h2>
      <div className="name-input">
        <p>Name</p>
        <input type="text" />
      </div>
      <div className="email-input">
        <p>Email address</p>
        <input type="text" />
      </div>
      <div className="password-input">
        <p>Password</p>
        <input type="password" />
      </div>
      <div className="password-input">
        <p>Confirm Password</p>
        <input type="password" />
      </div>
      <div className="signIn-button">
        <button>Sign Up</button>
        <button
          style={{
            marginLeft: "1rem",
            backgroundColor: "purple",
            borderColor: "purple",
          }}
          onClick={() => setLogin(!login)}
          className="responsive-button"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default SignUp;
