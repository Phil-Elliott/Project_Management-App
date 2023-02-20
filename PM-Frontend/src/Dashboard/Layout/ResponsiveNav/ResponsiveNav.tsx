import React, { useState } from "react";
import { FaArrowLeft, FaBars, FaRegCircle, FaSignOutAlt } from "react-icons/fa";
import { RiAccountCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setJwt } from "~/ProjectSlice";
import styles from "./ResponsiveNav.module.scss";

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

type ResponsiveNavProps = {
  toggleNav: () => void;
};

const ResponisveNav = ({ toggleNav }: ResponsiveNavProps) => {
  const [navLogo, setNavLogo] = useState<string>("ham");
  const [activeLogo, setActiveLogo] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    dispatch(setJwt(""));
    navigate("/signin");
  };

  const changeLogo = (logo: string) => {
    setNavLogo(logo);
  };

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <h2>sP</h2>
        </div>
        <div onClick={toggleNav} className={styles.toggle}>
          {navLogo === "ham" ? (
            <FaBars
              className="hamburger-icon"
              onClick={() => changeLogo("left")}
            />
          ) : (
            <FaArrowLeft
              className={
                activeLogo
                  ? styles["arrow-logo-left"]
                  : styles["arrow-logo-right"]
              }
              onClick={() => setActiveLogo(!activeLogo)}
            />
          )}
        </div>
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
            key={index}
          >
            <div className={styles["link-icon"]}>{link.icon}</div>
          </NavLink>
        ))}
        <div onClick={() => handleSignOut()} className={styles["icon-link"]}>
          <div className={styles["link-icon"]}>
            <FaSignOutAlt />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponisveNav;

/*
  Logo
  Hamburger icon

  Links on right


*/
