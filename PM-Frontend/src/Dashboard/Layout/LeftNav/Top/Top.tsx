import React from "react";
import { NavLink } from "react-router-dom";

import { FaRegCircle } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import styles from "./Top.module.scss";
import { supaClient } from "~/supa-client";

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
  // {
  //   icon: <FaSignOutAlt />,
  //   name: "Sign Out",
  //   route: "/signin",
  // },
];

const Top = ({ expand }: TopProps) => {
  return (
    <div className={styles.main}>
      <div
        className={styles.logo}
        style={!expand ? { justifyContent: "center" } : {}}
      >
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
            <div
              className={styles["icon-link"]}
              style={!expand ? { justifyContent: "center" } : {}}
            >
              <div className={styles["link-icon"]}>{link.icon}</div>
              {expand && <div className={styles["link-name"]}>{link.name}</div>}
            </div>
          </NavLink>
        ))}
        <NavLink
          to="/signin"
          style={{
            textDecoration: "none",
            color: "white",
            width: "100%",
          }}
          className={(navData) => (navData.isActive ? styles.activeLink : "")}
        >
          <div
            className={styles["icon-link"]}
            style={!expand ? { justifyContent: "center" } : {}}
            onClick={() => supaClient.auth.signOut()}
          >
            <div className={styles["link-icon"]}>
              <FaSignOutAlt />
            </div>
            {expand && <div className={styles["link-name"]}>Sign Out</div>}
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Top;

//onClick={() => supaClient.auth.signOut()}
