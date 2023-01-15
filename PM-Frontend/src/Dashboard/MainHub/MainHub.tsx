import React from "react";
import { Link } from "react-router-dom";
import { ProjectDataProps } from "~/shared/interfaces/Projects";
import styles from "./MainHub.module.scss";

type MainHubProps = {
  projects: ProjectDataProps[];
};

const MainHub = ({ projects }: MainHubProps) => {
  return (
    <div className={styles.main}>
      {projects.map((project, i) => {
        return (
          <Link
            className={styles.card}
            key={i}
            to={`/dashboard/${project.id}`}
            style={{
              textDecoration: "none",
              color: "white",
              width: "100%",
            }}
          >
            <h1>{project.name}</h1>
          </Link>
        );
      })}
    </div>
  );
};

export default MainHub;

/*
  Card
  - Title
  - Background
  
  2) Make a basic card component for each component
  3) Make sure that clicking goes to the board
  4) Fix up the card styles
  5) Add an edit section
        - Edit some of the details
        - Delete the project
  
  


*/
