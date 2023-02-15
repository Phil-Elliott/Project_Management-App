import React from "react";
import { BsFilter } from "react-icons/bs";
import { AiFillSetting } from "react-icons/ai";
import { Button } from "~/shared/components";
import styles from "./Settings.module.scss";

const Settings = () => {
  function handleClick() {
    console.log("Invite button clicked");
  }

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => handleClick()}>
        <div className={styles.btn}>
          <AiFillSetting />
          <p>Settings</p>
        </div>
      </Button>
    </div>
  );
};

export default Settings;
