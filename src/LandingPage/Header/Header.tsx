import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <div className={styles.header}>
      <h1>Simple Plan</h1>
      <ul>
        <li>Home</li>
        <li>About</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Contact</li>
      </ul>
      <div>
        <button className={styles.inBtn}>Sign In</button>
        <button className={styles.upBtn}>Sign Up</button>
      </div>
    </div>
  );
};

export default Header;
