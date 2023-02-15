import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { setJwt, setUser } from "~/ProjectSlice";

type LoginProps = {
  handleFormChange: () => void;
};

const Login = ({ handleFormChange }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1337/api/auth/local",
        {
          identifier: email,
          password: password,
        }
      );
      console.log("User profile", response.data.user);
      console.log("User token", response.data.jwt);
      // localStorage.setItem("jwt", response.data.jwt);
      let jwt = response.data.jwt;
      localStorage.setItem("jwt", jwt);

      // Redirect to the dashboard
      if (jwt) {
        dispatch(setJwt(jwt));
        dispatch(setUser(response.data.user));
        navigate("/dashboard/");
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        <label htmlFor="Password">Password</label>
        <input type="password" onChange={handlePassword} value={password} />
        <p className={styles.forgot}>Forgot Password</p>
        <div className={styles.buttons}>
          <button type="submit">Sign in</button>
        </div>
      </form>
      <p className={styles.signup}>
        Don't have an account?{" "}
        <span onClick={() => handleFormChange()}>Sign up</span>
      </p>
    </div>
  );
};

export default Login;
