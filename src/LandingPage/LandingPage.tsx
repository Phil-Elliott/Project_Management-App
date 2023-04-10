import React from "react";
import styles from "./LandingPage.module.scss";
import Header from "./Header/Header";
import TopSection from "./TopSection/TopSection";
import Board3 from "./../../public/Board3.gif";
import hero from "./../../public/hero2.jpg";

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
        <img src={Board3} alt="App gif" />
      </div>
    </div>
  );
};

export default LandingPage;
