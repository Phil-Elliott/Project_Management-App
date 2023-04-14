import React from "react";
import styles from "./LandingPage.module.scss";

import hero from "../assets/landing/hero2.jpg";
import Board3 from "../assets/landing/main.jpg";
import f1 from "../assets/landing/f1.png";
import f2 from "../assets/landing/f2.png";
import f3 from "../assets/landing/f3.png";
import f4 from "../assets/landing/f4.png";
import f5 from "../assets/landing/f5.png";

import Header from "./Header/Header";
import TopSection from "./TopSection/TopSection";
import Features from "./Features/Features";
import Pricing from "./Pricing/Pricing";
import Instructions from "./Instructions/Instructions";
import Reviews from "./Reviews/Reviews";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  return (
    <div id="about" className={styles.container}>
      <Header />
      <div
        className={styles.top}
        style={{
          backgroundImage: `url(${hero})`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
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
      {/* <Instructions /> */}
      <Features />
      <Pricing />
      <Reviews />
      <Footer />
    </div>
  );
};

export default LandingPage;
