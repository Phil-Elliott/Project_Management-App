import React from "react";
import styles from "./TopSection.module.scss";

const TopSection = () => {
  return (
    <div className={styles.topSection}>
      <h1>Advanced analytics to grow your business</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
        perspiciatis consequatur.
      </p>
      <button className={styles.btn}>Get Started</button>
    </div>
  );
};

export default TopSection;
