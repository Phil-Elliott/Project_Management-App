import CreateBoard from "./CreateBoard/CreateBoard";
import ProjectCard from "./ProjectCard/ProjectCard";

import { ProjectDataProps } from "~/shared/interfaces/Projects";
import styles from "./MainHub.module.scss";

type MainHubProps = {
  projects: ProjectDataProps[];
};

const MainHub = ({ projects }: MainHubProps) => {
  return (
    <div className={styles.main}>
      {projects.map((project, i) => {
        return <ProjectCard key={i} project={project} />;
      })}
      <CreateBoard />
    </div>
  );
};

export default MainHub;

/*
  
  
  
  5) Add an edit section
        - Edit some of the details
        - Delete the project
  
  


*/
