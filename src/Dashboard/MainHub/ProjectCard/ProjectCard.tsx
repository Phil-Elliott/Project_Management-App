import React from "react";
import { Link } from "react-router-dom";
import { ProjectDataProps } from "~/shared/interfaces/Projects";
import styles from "./ProjectCard.module.scss";

type ProjectCardProps = {
  project: ProjectDataProps;
};

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Link
      className={styles.card}
      to={`/dashboard/${project._id}`}
      style={{
        textDecoration: "none",
        backgroundImage: `url(${project.background})`,
        backgroundColor: project.background,
      }}
    >
      <h1>{project.title}</h1>
    </Link>
  );
};

export default ProjectCard;
