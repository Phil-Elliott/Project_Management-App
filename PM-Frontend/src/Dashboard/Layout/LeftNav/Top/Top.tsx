import React from "react";
import { FaPlus, FaRegCircle } from "react-icons/fa";
import styles from "./Top.module.scss";

const iconLinks = [
  {
    icon: <FaPlus />,
    name: "New project",
    route: "/dashboard/",
  },
  {
    icon: <FaRegCircle />,
    name: "Projects Hub",
    route: "/dashboard/",
  },
];

const Top = () => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h2>sP</h2>
      </div>
      <div className={styles["icon-container"]}>
        {iconLinks.map((link) => (
          <div className={styles["icon-link"]} key={link.name}>
            <a href={link.route}>{link.icon}</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Top;
