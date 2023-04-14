import React from "react";
import styles from "./Reviews.module.scss";
import { AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const reviews = [
  {
    name: "Amy Adams",
    review:
      "Game changer! Love the real-time dashboard & task tracking. Highly recommend!",
    company: "Google",
  },
  {
    name: "Ethan Hunt",
    review:
      "Data-driven decisions made easy! Advanced analytics feature is a lifesaver.",
    company: "Facebook",
  },
  {
    name: "Sandra Fox",
    review:
      "Seamless collaboration! Real-time chat has boosted our team productivity.",
    company: "Amazon",
  },
  {
    name: "Loren Smith",
    review:
      "Secure storage & user permission controls are top-notch. Very impressed.",
    company: "Netflix",
  },
  {
    name: "Tom Brady",
    review:
      "All-in-one project management tool has saved us time & effort. A must-have!",
    company: "Hulu",
  },
  {
    name: "John Santos",
    review:
      "This is much better than the project management software we created. It's so much easier to use and it's free!",
    company: "Trello",
  },
];

const Reviews = () => {
  return (
    <div id="reviews" className={styles.main}>
      <h1>Loved by many</h1>
      <div className={styles.reviews}>
        {reviews.map((review, i) => (
          <div className={styles.review} key={i}>
            <div className={styles.stars}>
              <AiFillStar className={styles["gradient-text"]} />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
            </div>
            <p className={styles.reviewText}>{review.review}</p>
            <div className={styles.user}>
              <div className={styles.userImg}>
                <FaUserCircle className={styles.img} />
              </div>
              <div className={styles.userInfo}>
                <h3>{review.name}</h3>
                <p>{review.company}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
