import React, { useState } from "react";
import styles from "./Login.module.scss";

type LoginProps = {
  handleFormChange: () => void;
};

const Login = ({ handleFormChange }: LoginProps) => {
  // States for registration
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // States for checking the errors
  const [error, setError] = useState("");

  // Handling the email change
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  // Handling the password change
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // Handling the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email === "" || password === "") {
      console.log("Please fill all the fields");
    } else {
      console.log("Form submitted");
      console.log(email, password);
    }
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        <label htmlFor="Password">Password</label>
        <input type="password" onChange={handlePassword} value={password} />
        <div className={styles.buttons}>
          <button type="submit">Sign in</button>
          <button type="submit">Sign in with Google</button>
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
