import React from "react";
import styles from "./Reviews.module.scss";
import { AiFillStar } from "react-icons/ai";
import { FaUserCircle } from "react-icons/fa";

const reviews = [
  {
    name: "Amy Adams",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    company: "Google",
  },
  {
    name: "Ethan Hunt",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    company: "Facebook",
  },
  {
    name: "Sandra Fox",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    company: "Amazon",
  },
  {
    name: "Loren Smith",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    company: "Netflix",
  },
  {
    name: "Tom Brady",
    review:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
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
    <div className={styles.main}>
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
