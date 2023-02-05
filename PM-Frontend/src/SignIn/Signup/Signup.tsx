import React, { useState } from "react";
import styles from "./Signup.module.scss";
import { Button } from "~/shared/components";

type SignupProps = {
  handleFormChange: () => void;
};

const Signup = ({ handleFormChange }: SignupProps) => {
  // States for registration
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // States for checking the errors
  const [error, setError] = useState<string>("");

  // Handling the name change
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") {
      console.log("Please fill all the fields");
    } else {
      console.log("Form submitted");
    }
  };

  return (
    <div className={styles.main}>
      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="Name">Name</label>
        <input type="text" onChange={handleName} value={name} />
        <label htmlFor="Email">Email</label>
        <input type="email" onChange={handleEmail} value={email} />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          onChange={handleConfirmPassword}
          value={password}
        />
        <label htmlFor="Password">Confirm Password</label>
        <input type="password" onChange={handlePassword} value={password} />
        <div className={styles.buttons}>
          <button type="submit">Sign up</button>
          <button type="submit">Sign up with Google</button>
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
