import { useEffect, useState } from "react";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import styles from "./SignIn.module.scss";
import image from "~/assets/signin.jpg";

import { useSelector } from "react-redux";
import { RootState } from "~/Store";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const jwt = useSelector((state: RootState) => state.project.jwt);

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      navigate("/dashboard/");
    }
  }, [jwt]);

  console.log(jwt, "signin jwt");

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

*/
