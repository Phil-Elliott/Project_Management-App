import React from "react";
import Bottom from "./Bottom/Bottom";
import Top from "./Top/Top";

import styles from "./LeftNav.module.scss";

import { FaAngleDoubleRight } from "react-icons/fa";

const LeftNav = () => {
  return (
    <div className={styles.main}>
      <div className={styles["nav-container"]}>
        <Top />
        <Bottom />
      </div>
      <div className={styles["arrow-container"]}>
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};

export default LeftNav;
