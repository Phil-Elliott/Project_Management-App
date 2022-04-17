import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  createAuthUserWithEmailAndPassword,
} from "../../utils/Firebase/Firebase"

interface signUpData {
  displayName: string
  email: string
  password: string
  confirmPassword: string
}

const defaultSignUpData = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUp = ({ login, setLogin }: { login: boolean; setLogin: any }) => {
  const [signUpData, setSignUpData] = useState<signUpData>(defaultSignUpData)

  const { displayName, email, password, confirmPassword } = signUpData

  const resetSignUpData = () => {
    setSignUpData(defaultSignUpData)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      const response = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(response?.user, { displayName })
      resetSignUpData()
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already in use")
      } else {
        console.log("error", error)
      }
    }
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setSignUpData({
      ...signUpData,
      [name]: value,
    })
  }

  return (
    <div className="content">
      <h2>Lets Get Started!</h2>
      <form onSubmit={handleSubmit}>
        <div className="name-input">
          <label>Name</label>
          <input
            required
            type="text"
            name="displayName"
            value={displayName}
            onChange={handleChange}
          />
        </div>
        <div className="email-input">
          <label>Email address</label>
          <input
            required
            type="text"
            name="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="password-input">
          <label>Password</label>
          <input
            type="password"
            required
            name="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="password-input">
          <label>Confirm Password</label>
          <input
            type="password"
            required
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="signIn-button">
          <div className="top-buttons">
            {/* <Link
              to="/dashboard"
              style={{
                textDecoration: "none",
                color: "black",
              }}
            > */}
            <button className="signIn-bttn">Sign Up</button>
            {/* </Link> */}
            <button
              style={{
                marginLeft: "1rem",
                backgroundColor: "purple",
                borderColor: "purple",
              }}
              onClick={() => setLogin(!login)}
              className="responsive-button signIn-bttn"
            >
              Sign In
            </button>
          </div>
          {/* <button className="google-button" onClick={logGoogleUser}>
            Sign up with Google
          </button> */}
        </div>
      </form>
    </div>
  )
}

export default SignUp

// Need to have app signin when done
// Need to somehow store the data in the database
