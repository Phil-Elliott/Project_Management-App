import React from "react";
import { BsFilter } from "react-icons/bs";
import { Button } from "~/shared/components";
import styles from "./Filter.module.scss";

const Filter = () => {
  function handleClick() {
    console.log("Invite button clicked");
  }

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => handleClick()}>
        <div className={styles.btn}>
          <BsFilter />
          <p>Filter</p>
        </div>
      </Button>
    </div>
  );
};

export default Filter;
