import React, { useState } from "react";
import styles from "./Nav.module.scss";
import { FaAngleDown, FaTh, FaTasks } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useProject } from "./ProjectLayout";

const Nav = () => {
  const project = useProject();

  const navLinksArr = [
    {
      logo: <FaTh />,
      name: "Display",
      route: `/dashboard/${project.id}`,
    },
    {
      logo: <FaTasks />,
      name: "Board",
      route: `/dashboard/${project.id}/board`,
    },
  ];

  return (
    <div className={styles.main}>
      <p className={styles.name}>{project.name}</p>
      <div className={styles.links}>
        {navLinksArr.map((link, i) => {
          return (
            <NavLink
              key={link.name}
              to={link.route}
              style={{
                textDecoration: "none",
              }}
              className={styles.link}
            >
              {link.logo}
              <p>{link.name}</p>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Nav;

/*


*/
