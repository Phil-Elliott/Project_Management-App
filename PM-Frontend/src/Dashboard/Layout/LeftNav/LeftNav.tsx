import React, { useState } from "react";
import Bottom from "./Bottom/Bottom";
import Top from "./Top/Top";

import styles from "./LeftNav.module.scss";

import { FaAngleDoubleRight } from "react-icons/fa";

type LeftNavProps = {
  hideNav: boolean;
  toggleModal: () => void;
};

const LeftNav = ({ hideNav, toggleModal }: LeftNavProps) => {
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <div
      className={hideNav ? `${styles.main} ${styles.hide}` : styles.main}
      style={expand ? { width: "16rem" } : { width: "4.5rem" }}
    >
      <div className={styles["nav-container"]}>
        <Top expand={expand} toggleModal={toggleModal} />
        <div className={styles["bottom-nav"]}>
          <Bottom expand={expand} />
        </div>
      </div>
      <div
        className={`${styles["arrow-container"]} ${expand && styles["rotate"]}`}
        onClick={() => setExpand(!expand)}
      >
        <FaAngleDoubleRight />
      </div>
    </div>
  );
};

export default LeftNav;
