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

  console.log(jwt);

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

put user into redux store
could make your own slice out here

check the redux on signin to see if there is a jwt
  redirect to dashboard if so

check the redux on dashboard to see if there is a jwt
  redirect to signin if not


Maybe need to reset all redux state on logout
  Have an action that is called in logout function the resets all state in stores


  Have the token expire over time


  Add in all of the data tables to strapi

*/
