import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

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
    <nav className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <h1>SimplePlan</h1>
      <ul className={styles.tabs}>
        <a href="#about">
          <li>About</li>
        </a>
        <a href="#features">
          <li>Features</li>
        </a>
        <a href="#pricing">
          <li>Pricing</li>
        </a>
        <a href="#reviews">
          <li>Reviews</li>
        </a>
      </ul>
      <div className={styles.buttons}>
        <NavLink to="/signIn">
          <button className={styles.inBtn}>Sign In</button>
        </NavLink>
        <NavLink to="/signIn">
          <button className={styles.upBtn}>Sign Up</button>
        </NavLink>
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
    </nav>
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
