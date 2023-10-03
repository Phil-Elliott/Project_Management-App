import styles from "./LandingPage.module.scss";
import Header from "./Header/Header";
import TopSection from "./TopSection/TopSection";
import Features from "./Features/Features";
import Pricing from "./Pricing/Pricing";
import Reviews from "./Reviews/Reviews";
import Footer from "./Footer/Footer";

const LandingPage = () => {
  return (
    <div id="about" className={styles.container}>
      <Header />
      <div
        className={styles.top}
        style={{
          backgroundImage: `url(data:image/svg+xml,%3Csvg%20width%3D%221%22%20height%3D%221%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Crect%20width%3D%221%22%20height%3D%221%22%20fill%3D%22%23000%22/%3E%3C/svg%3E), url(https://res.cloudinary.com/djdxd5akb/image/upload/v1694903795/PM-App/landing/hero2_vxqxzu.jpg)`,
          // backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <TopSection />
      </div>
      <div className={styles.topGif}>
        <img
          className={styles.gif}
          src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903792/PM-App/landing/main_mtauvo.jpg"
          alt="App gif"
          loading="eager"
        />
        <div className={styles["logo-container"]}>
          <img
            src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903791/PM-App/landing/f1_nlqcsg.png"
            alt="company logo"
            loading="lazy"
          />
          <img
            src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903792/PM-App/landing/f2_dizjgl.png"
            alt="company logo"
            loading="lazy"
          />
          <img
            src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903793/PM-App/landing/f3_bxp8qf.png"
            alt="company logo"
            loading="lazy"
          />
          <img
            src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903794/PM-App/landing/f4_nt7pmn.png"
            alt="company logo"
            loading="lazy"
          />
          <img
            src="https://res.cloudinary.com/djdxd5akb/image/upload/v1694903794/PM-App/landing/f5_pflzhv.png"
            alt="company logo"
            loading="lazy"
          />
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
