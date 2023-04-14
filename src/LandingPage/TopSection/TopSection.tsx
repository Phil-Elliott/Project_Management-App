import styles from "./TopSection.module.scss";

import { NavLink } from "react-router-dom";

const TopSection = () => {
  return (
    <div className={styles.topSection}>
      <h1>The Ultimate Project Management App</h1>
      <p>
        Grow your business with advanced analytics in our project management
        app, featuring customizable dashboards and real-time reporting for
        optimized performance.
      </p>
      <NavLink to="/signIn">
        <button className={styles.btn}>Get Started</button>
      </NavLink>
    </div>
  );
};

export default TopSection;
