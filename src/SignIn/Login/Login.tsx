import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./Login.module.scss";
import { useDispatch } from "react-redux";
import { setJwt, setUser } from "~/ProjectSlice";

const Login = () => {
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
        "https://pm-server-production.up.railway.app/api/v1/auth/login",
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      );
      let jwt = response.data.token;
      localStorage.setItem("jwt", jwt);

      // Redirect to the dashboard
      if (jwt) {
        dispatch(setJwt(jwt));
        dispatch(setUser(response.data.data.user));
        navigate("/dashboard/");
      }
    } catch (error: any) {
      setError("error");
    }
  };

  return (
    <div className={styles.main}>
      <h2>Welcome back</h2>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        {error && <p className={styles.error}>👋 Invalid email or password</p>}
        <label htmlFor="Password">Password</label>
        <input type="password" onChange={handlePassword} value={password} />
        {/* <p className={styles.forgot}>Forgot Password</p> */}
        <div className={styles.buttons}>
          <button type="submit">Sign in</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
