import React, { useState } from "react";
import axios from "axios";

import styles from "./Signup.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJwt, setUser } from "~/ProjectSlice";

type SignupProps = {
  handleFormChange: () => void;
};

const Signup = ({ handleFormChange }: SignupProps) => {
  // States for registration
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [attempted, setAttempted] = useState<boolean>(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  // Handling the name change
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handling the password change
  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAttempted(true);
      return;
    }
    if (password.length < 6) {
      setAttempted(true);
      return;
    }

    if (username === "" || email === "") {
      setAttempted(true);
      return;
    }

    axios
      .post(
        "https://strapi-production-7520.up.railway.app/api/auth/local/register",
        {
          username: username,
          email: email,
          password: password,
        }
      )
      .then((response) => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        let jwt = response.data.jwt;
        localStorage.setItem("jwt", jwt);

        // Redirect to the dashboard
        if (jwt) {
          dispatch(setJwt(jwt));
          dispatch(setUser(response.data.user));
          navigate("/dashboard/");
        }
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={handleName} value={username} />
        {username === "" && attempted && (
          <p className={styles.error}>👋 Please enter a username</p>
        )}
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        {email === "" && attempted && (
          <p className={styles.error}>👋 Please enter an email</p>
        )}
        <label htmlFor="Password">Password</label>
        <input type="password" onChange={handlePassword} value={password} />
        {password.length < 6 && attempted && (
          <p className={styles.error}>
            👋 Passwords must be at least 6 characters
          </p>
        )}
        {/* <p>Passwords must be at least 6 characters.</p> */}
        <label htmlFor="Confirm Password">Re-enter password</label>
        <input
          type="password"
          onChange={handleConfirmPassword}
          value={confirmPassword}
        />
        {password !== confirmPassword && attempted && (
          <p className={styles.error}>👋 Passwords do not match</p>
        )}
        <div className={styles.buttons}>
          <button type="submit">Sign up</button>
        </div>
      </form>
      <p className={styles.signup}>
        Already have an account?{" "}
        <span onClick={() => handleFormChange()}>Sign in</span>
      </p>
    </div>
  );
};

export default Signup;

/*
  


  


*/
