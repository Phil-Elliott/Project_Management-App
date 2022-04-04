import React from "react"

export const Login = ({
  login,
  setLogin,
}: {
  login: boolean
  setLogin: any
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
        <button>Sign In</button>
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
  )
}
