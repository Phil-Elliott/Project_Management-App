import React from "react";
import styles from "./Features.module.scss";

import { BsFillPeopleFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";

const FeatureList = [
  {
    icon: <BsFillPeopleFill />,
    title: "Project Management",
    description:
      "Manage your projects and tasks with ease. Manage your projects and tasks with ease.",
  },
  {
    icon: <FaTasks />,
    title: "Task Management",
    description:
      "Manage your projects and tasks with ease. Manage your projects and tasks with ease.",
  },
  {
    icon: <MdOutlineDashboardCustomize />,
    title: "Dashboard",
    description:
      "Manage your projects and tasks with ease. Manage your projects and tasks with ease.",
  },
  {
    icon: <AiFillDatabase />,
    title: "Database",
    description:
      "Manage your projects and tasks with ease. Manage your projects and tasks with ease.",
  },
];

const Features = () => {
  return (
    <div id="features" className={styles.main}>
      <div className={styles.container}>
        <h5>Top Features</h5>
        <h1>Plan projects fast.</h1>
        <p className={styles["top-description"]}>
          Planning a project and creating tasks has never been easier.
        </p>
        <div className={styles.features}>
          {FeatureList.map((feature, i) => (
            <div key={i} className={styles["feature"]}>
              <div className={styles["feature-img"]}>{feature.icon}</div>
              <div className={styles["feature-text"]}>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
