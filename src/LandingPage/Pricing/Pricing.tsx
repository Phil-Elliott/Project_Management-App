import React from "react";
import styles from "./Pricing.module.scss";
// import hero from "./../../../public/hero2.jpg";
import hero from "../../assets/landing/hero2.jpg";
import { FaCheckCircle } from "react-icons/fa";

const Plans = [
  {
    title: "Basic Plan",
    price: "Free",
    benefits: ["8 Projects", "Unlimited Tasks", "10 Users", "10GB Storage"],
  },
  {
    title: "Advanced Plan",
    price: "$4.99 / Month",
    benefits: ["30 Projects", "Unlimited Tasks", "100 Users", "100GB Storage"],
  },
  {
    title: "Premium Plan",
    price: "$9.99 / Month",
    benefits: [
      "Unlimited Projects",
      "Unlimited Tasks",
      "Unlimited Users",
      "Unlimited Storage",
    ],
  },
];

const Pricing = () => {
  return (
    <div
      id="pricing"
      className={styles.main}
      style={{
        backgroundImage: `url(${hero})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className={styles.header}>We have plans for everyone</h1>
      <p className={styles["top-description"]}>
        Planning a project and creating tasks has never been easier.
      </p>
      <div className={styles.plans}>
        {Plans.map((plan, i) => (
          <div key={i} className={styles["plan"]}>
            <h1>{plan.title}</h1>
            <div className={styles.benefits}>
              {plan.benefits.map((benefit, j) => (
                <div key={j}>
                  <FaCheckCircle />
                  <p>{benefit}</p>
                </div>
              ))}
            </div>
            <h2>{plan.price}</h2>
            <button>Get Started</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
