import React from "react";

import { Button } from "~/shared/components";

import styles from "./Invite.module.scss";
import { BsFillPeopleFill } from "react-icons/bs";

const Invite = () => {
  function handleClick() {
    console.log("Invite button clicked");
  }

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => handleClick()}>
        <div className={styles.btn}>
          <BsFillPeopleFill />
          <p>Invite</p>
        </div>
      </Button>
    </div>
  );
};

export default Invite;
