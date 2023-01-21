import React from "react";
import { NavLink } from "react-router-dom";

import { FaRegCircle } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { RiAccountCircleFill } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import styles from "./Top.module.scss";

type TopProps = {
  expand: boolean;
};

const iconLinks = [
  {
    icon: <FaRegCircle />,
    name: "Projects",
    route: "/dashboard/",
  },
  {
    icon: <RiAccountCircleFill />,
    name: "Profile",
    route: "/dashboard/profile/",
  },
];

const Top = ({ expand }: TopProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <h2>sP</h2>
        {expand && <h3>SimplePlan</h3>}
      </div>
      <div className={styles["icon-container"]}>
        {iconLinks.map((link, index) => (
          <NavLink
            to={link.route}
            style={{
              textDecoration: "none",
              color: "white",
              width: "100%",
            }}
            className={(navData) => (navData.isActive ? styles.activeLink : "")}
            key={index}
          >
            <div className={styles["icon-link"]}>
              <div className={styles["link-icon"]}>{link.icon}</div>
              {expand && <div className={styles["link-name"]}>{link.name}</div>}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Top;
