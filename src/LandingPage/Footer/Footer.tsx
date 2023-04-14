import React from "react";
import styles from "./Footer.module.scss";

import { AiFillTwitterSquare } from "react-icons/ai";
import { AiFillFacebook } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";
import { FaGithubSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <p>© 2023, SimplePlan</p>
        <p>License</p>
        <p>Terms</p>
        <p>Privacy</p>
      </div>
      <div className={styles.right}>
        <AiFillTwitterSquare className={styles.icon} />
        <AiFillFacebook className={styles.icon} />
        <AiFillInstagram className={styles.icon} />
        <FaGithubSquare className={styles.icon} />
      </div>
    </div>
  );
};

export default Footer;
