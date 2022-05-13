import React, { useState } from "react"
import { Link } from "react-router-dom"
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/Firebase/Firebase"
import { useNavigate } from "react-router-dom"

interface loginData {
  email: string
  password: string
}

const defaultLoginData = {
  email: "",
  password: "",
}

export const Login = ({
  login,
  setLogin,
  setIsAuth,
}: {
  login: boolean
  setLogin: any
  setIsAuth: any
}) => {
  const [loginData, setLoginData] = useState<loginData>(defaultLoginData)
  const { email, password } = loginData

  let navigate = useNavigate()

  const resetloginData = () => {
    setLoginData(defaultLoginData)
  }

  const handleChange = (event: any) => {
    const { name, value } = event.target
    setLoginData({
      ...loginData,
      [name]: value,
    })
  }

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
    console.log(user)
    setIsAuth(true)
    resetloginData()
    navigate("/dashboard")
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    console.log("it ran")

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      setIsAuth(true)
      console.log(response)
      navigate("/dashboard")
      resetloginData()
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("incorrect password for email")
          break
        case "auth/user-not-found":
          alert("no user associated with this email")
          break
        default:
          console.log(error)
      }
    }
  }

  return (
    <div className="content">
      <h2>Welcome Back!</h2>
      <form onSubmit={handleSubmit}>
        <div className="email-input">
          <label>Email address</label>
          <input
            required
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleChange}
          />
        </div>
        <div className="password-input">
          <label>Password</label>
          <input
            required
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
          />
        </div>
        <div className="signIn-button">
          <div className="top-buttons">
            <button type="submit" className="signIn-bttn">
              Sign In
            </button>

            <button
              style={{
                marginLeft: "1rem",
                backgroundColor: "purple",
                borderColor: "purple",
              }}
              onClick={() => setLogin(!login)}
              className="responsive-button signIn-bttn"
            >
              Create Account
            </button>
          </div>
          <button
            type="button"
            className="google-button"
            onClick={logGoogleUser}
          >
            Sign In with Google
          </button>
        </div>
      </form>
    </div>
  )
}
