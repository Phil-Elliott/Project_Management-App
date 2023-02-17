import React, { useEffect } from "react";
import styles from "./Bottom.module.scss";
import { FaAngleDown } from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { useSelector } from "react-redux";
import { RootState } from "~/Store";

type BottomProps = {
  expand: boolean;
};

const Bottom = ({ expand }: BottomProps) => {
  const projects = useSelector((state: RootState) => state.project.projects);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <div className={styles.main}>
      {/* <div className={styles["arrow-container"]}>
        <FaAngleDown />
      </div> */}
      <div className={styles["projects-container"]}>
        {projects.map((project, index) => (
          <NavLink
            key={index}
            to={`/dashboard/${project.id}`}
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
            >
              <div
                style={{
                  backgroundImage: `url(${project.background})`,
                  backgroundColor: project.background,
                }}
                className={styles["link-icon"]}
              >
                {project.title[0].toUpperCase()}
              </div>
              {expand && (
                <div className={styles["link-name"]}>{project.title}</div>
              )}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Bottom;

/*

    1) Get the projects state
    2) Create links based off of that information
    



*/
