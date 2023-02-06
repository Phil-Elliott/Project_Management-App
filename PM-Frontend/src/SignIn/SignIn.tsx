import { useContext, useEffect, useState } from "react";
import { Navigate, redirect } from "react-router-dom";
import styles from "./SignIn.module.scss";
import image from "~/assets/signin.jpg";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { supaClient } from "~/supa-client";
import { UserContext } from "~/App";

const SignIn = () => {
  const { session } = useContext(UserContext);

  if (session) {
    return <Navigate to="/dashboard/" />;
  }

  return (
    <div className={styles.main}>
      <div className={styles["image-container"]}>
        <img src={image} alt="post it notes" />
      </div>
      <div className={styles["form-container"]}>
        <h1 className={styles.header}>Simple Plan</h1>
        <Auth
          supabaseClient={supaClient}
          appearance={{
            theme: ThemeSupa,
            className: {
              container: styles.container,
              label: styles.label,
              button: styles.button,
              input: styles.input,
            },
          }}
          view={"sign_in"}
        />
      </div>
    </div>
  );
};

export default SignIn;

/*






{/* 

import Login from "./Login/Login";
import Signup from "./Signup/Signup";

import { Button } from "~/shared/components";


const [login, setLogin] = useState(true);

  const handleFormChange = () => {
    setLogin(!login);
  };

{login ? (
          <Login handleFormChange={() => handleFormChange()} />
        ) : (
          <Signup handleFormChange={() => handleFormChange()} />
        )} 

*/
