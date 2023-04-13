import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 10) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <h1>Simple Plan</h1>
      <ul>
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
