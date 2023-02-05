import { useState } from "react";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import { Button } from "~/shared/components";

import styles from "./SignIn.module.scss";
import image from "~/assets/signin.jpg";

const SignIn = () => {
  const [login, setLogin] = useState(true);

  const handleFormChange = () => {
    setLogin(!login);
  };

  return (
    <div className={styles.main}>
      <div className={styles["image-container"]}>
        <img src={image} alt="post it notes" />
      </div>
      <div className={styles["form-container"]}>
        <h1 className={styles.header}>Simple Plan</h1>
        {login ? (
          <Login handleFormChange={() => handleFormChange()} />
        ) : (
          <Signup handleFormChange={() => handleFormChange()} />
        )}
      </div>
    </div>
  );
};

export default SignIn;

/*

1) Create signin
2) Create signup


*/
