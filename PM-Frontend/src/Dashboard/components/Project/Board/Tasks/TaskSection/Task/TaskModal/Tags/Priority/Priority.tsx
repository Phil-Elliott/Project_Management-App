import React from "react";
import styles from "./Priority.module.scss";

const Priority = () => {
  return (
    <div className={styles["priority"]}>
      <p>Priority</p>
      <div className={styles["priority-content"]}>
        <p>Normal</p>
      </div>
    </div>
  );
};

export default Priority;
