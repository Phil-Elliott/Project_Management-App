import React, { useState } from "react"
import "./SignIn.scss"
import { Login } from "./Components/Login"
import SignUp from "./Components/SignUp"
import {
  FaApple,
  FaAndroid,
  FaChrome,
  FaInternetExplorer,
  FaFirefox,
} from "react-icons/fa"

const SignIn = ({ setIsAuth }: { setIsAuth: any }) => {
  const [login, setLogin] = useState<boolean>(true)

  return (
    <div className="signIn-main-container">
      <div className="signIn-left-container">
        <h1>{login ? "Try It For Free Today!" : "Already Have An Account"}</h1>
        <p>Keep It Simple</p>
        <button className="signIn-bttn" onClick={() => setLogin(!login)}>
          {login ? "Create Account" : "Sign In"}
        </button>
      </div>
      <div className="signIn-right-container">
        <h1>Simple Plan</h1>
        {login ? (
          <Login login={login} setLogin={setLogin} setIsAuth={setIsAuth} />
        ) : (
          <SignUp login={login} setLogin={setLogin} />
        )}
        <div className="bottom">
          <p>
            Available on
            <span>
              <FaApple />
            </span>
            IOS
            <span>
              <FaAndroid />
            </span>
            Android
          </p>
          <div className="browsers">
            <p>Supported Browsers</p>
            <FaChrome className="browser-icon" />
            <FaInternetExplorer className="browser-icon" />
            <FaFirefox className="browser-icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn

/*
    1) Have create account bttn change to login
    2) Make Responsive 
    3) Add form validation 
    4) Maybe add forgot password and keep signed in 


    


*/
