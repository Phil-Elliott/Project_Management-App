import { useEffect, useState } from "react";

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import styles from "./SignIn.module.scss";
import image from "~/assets/sign.svg";

import { useSelector } from "react-redux";
import { RootState } from "~/Store";
import { useNavigate, NavLink } from "react-router-dom";

const SignIn = () => {
  const [login, setLogin] = useState(true);

  const navigate = useNavigate();

  const jwt = useSelector((state: RootState) => state.project.jwt);

  useEffect(() => {
    if (localStorage.getItem("jwt") !== null) {
      navigate("/dashboard/");
    }
  }, [jwt]);

  const handleFormChange = () => {
    setLogin(!login);
  };

  return (
    <div className={styles.main}>
      <div className={styles["form-container"]}>
        <NavLink
          to={"/"}
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
          }}
        >
          <h1 className={styles.header}>Simple Plan</h1>
        </NavLink>
        {login ? <Login /> : <Signup />}

        {!login ? (
          <p className={styles.signup}>
            Already have an account?{" "}
            <span onClick={() => handleFormChange()}>Sign in</span>
          </p>
        ) : (
          <p className={styles.signup}>
            Don't have an account?{" "}
            <span onClick={() => handleFormChange()}>Sign up</span>
          </p>
        )}
      </div>
      <div className={styles["image-container"]}>
        <img src={image} alt="pm app picture" />
      </div>
    </div>
  );
};

export default SignIn;
