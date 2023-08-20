import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { FaRegCircle } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaSignOutAlt } from "react-icons/fa";

import styles from "./Top.module.scss";

import { useDispatch } from "react-redux";
import { setJwt } from "~/ProjectSlice";

type TopProps = {
  expand: boolean;
  toggleModal: () => void;
};

const iconLinks = [
  {
    icon: <FaRegCircle />,
    name: "Projects",
    route: "/dashboard/",
  },
];

const Top = ({ expand, toggleModal }: TopProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    dispatch(setJwt(""));
    navigate("/signIn");
  };

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
        <div
          onClick={() => toggleModal()}
          className={styles["icon-link"]}
          style={!expand ? { justifyContent: "center" } : {}}
        >
          <div className={styles["link-icon"]}>
            <RiAccountCircleFill />
          </div>
          {expand && <div className={styles["link-name"]}>Profile</div>}
        </div>
        <div
          onClick={() => handleSignOut()}
          className={styles["icon-link"]}
          style={!expand ? { justifyContent: "center" } : {}}
        >
          <div className={styles["link-icon"]}>
            <FaSignOutAlt />
          </div>
          {expand && <div className={styles["link-name"]}>Sign Out</div>}
        </div>
      </div>
    </div>
  );
};

export default Top;

/*

  Can i put the model in this file or in the layout file so i can access it from the responsive


*/
