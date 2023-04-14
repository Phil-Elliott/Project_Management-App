import React from "react";
import styles from "./Features.module.scss";

import { BsFillPeopleFill } from "react-icons/bs";
import { FaTasks } from "react-icons/fa";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import { AiFillDatabase } from "react-icons/ai";

const FeatureList = [
  {
    icon: <BsFillPeopleFill />,
    title: "Team Management",
    description:
      "Collaborate seamlessly with your team using our app's task assignments, shared calendars, and real-time chat.",
  },
  {
    icon: <FaTasks />,
    title: "Task Management",
    description:
      "Easily assign, prioritize, and track tasks with our app's task management feature. Stay organized with task lists, deadlines, and progress tracking.",
  },
  {
    icon: <MdOutlineDashboardCustomize />,
    title: "Dashboard",
    description:
      "Get real-time project insights with our customizable dashboard. Widgets for key performance indicators and project timelines keep you informed and ahead of the game.",
  },
  {
    icon: <AiFillDatabase />,
    title: "Database",
    description:
      "Securely store and access all project details with our app's database. User permissions and automatic backups provide peace of mind for growing your business.",
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
