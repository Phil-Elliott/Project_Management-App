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

    axios
      .post("http://localhost:1337/api/auth/local/register", {
        username: username,
        email: email,
        password: password,
      })
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
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        <label htmlFor="Password">Password</label>
        {/* <input
          type="password"
          onChange={handleConfirmPassword}
          value={password}
        /> */}
        <label htmlFor="Password">Password</label>
        <input type="password" onChange={handlePassword} value={password} />
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
  Login user
  1) Have a useEffect or a conditional
  2) Check if the user is logged in
  3) If the user is logged in, redirect to the dashboard

  Log out user
  1) Allow user to log out and redirect to the signin page


  Pass info around
  1) Use context or redux

  


*/
