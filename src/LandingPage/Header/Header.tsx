import React, { useState, useEffect } from "react";
import styles from "./Header.module.scss";
import { GiHamburgerMenu } from "react-icons/gi";
import { Popup } from "~/shared/components";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [popup, setPopup] = useState(false);

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
      <h1>SimplePlan</h1>
      <ul className={styles.tabs}>
        <li>About</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Contact</li>
      </ul>
      <div className={styles.buttons}>
        <button className={styles.inBtn}>Sign In</button>
        <button className={styles.upBtn}>Sign Up</button>
      </div>
      <div className={styles.hamburger} onClick={() => setPopup(true)}>
        <GiHamburgerMenu />
      </div>
      {popup && (
        <Popup close={() => setPopup(false)}>
          <div className={styles.popup}>
            <ul>
              <li>About</li>
              <li>Features</li>
              <li>Pricing</li>
              <li>Contact</li>
            </ul>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Header;

/*

Responsive header

1) Add hamburger menu Icon
2) Have it displayed at certain width
3) Have other things disappear at certain width
4) Make a popup menu and have that abide by width



*/
