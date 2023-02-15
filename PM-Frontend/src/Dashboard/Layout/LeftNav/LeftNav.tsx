import React, { useState } from "react";
import Bottom from "./Bottom/Bottom";
import Top from "./Top/Top";

import styles from "./LeftNav.module.scss";

import { FaAngleDoubleRight } from "react-icons/fa";

type LeftNavProps = {
  hideNav: boolean;
};

const LeftNav = ({ hideNav }: LeftNavProps) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div
      className={hideNav ? `${styles.main} ${styles.hide}` : styles.main}
      style={expand ? { width: "13rem" } : { width: "3.5rem" }}
    >
      <div className={styles["nav-container"]}>
        <Top expand={expand} />
        <Bottom expand={expand} />
      </div>
      <div
        className={styles["arrow-container"]}
        onClick={() => setExpand(!expand)}
      >
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};

export default LeftNav;
