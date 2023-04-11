import React from "react";
import styles from "./LandingPage.module.scss";
import Header from "./Header/Header";
import TopSection from "./TopSection/TopSection";
import Board3 from "./../../public/Board3.gif";
import hero from "./../../public/hero2.jpg";
import f1 from "../assets/landing/f1.png";
import f2 from "../assets/landing/f2.png";
import f3 from "../assets/landing/f3.png";
import f4 from "../assets/landing/f4.png";
import f5 from "../assets/landing/f5.png";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div
        className={styles.top}
        style={{
          backgroundImage: `url(${hero})`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header />
        <TopSection />
      </div>
      <div className={styles.topGif}>
        <img className={styles.gif} src={Board3} alt="App gif" />
        <div className={styles["logo-container"]}>
          <img src={f1} alt="company logo" />
          <img src={f2} alt="company logo" />
          <img src={f3} alt="company logo" />
          <img src={f4} alt="company logo" />
          <img src={f5} alt="company logo" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
