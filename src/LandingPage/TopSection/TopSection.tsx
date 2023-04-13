import styles from "./TopSection.module.scss";

import { NavLink } from "react-router-dom";

const TopSection = () => {
  return (
    <div className={styles.topSection}>
      <h1>Advanced analytics to grow your business</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque
        perspiciatis consequatur.
      </p>
      <NavLink to="/signIn">
        <button className={styles.btn}>Get Started</button>
      </NavLink>
    </div>
  );
};

export default TopSection;
