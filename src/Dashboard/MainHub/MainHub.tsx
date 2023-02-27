import CreateBoard from "./CreateBoard/CreateBoard";
import ProjectCard from "./ProjectCard/ProjectCard";

import { ProjectDataProps } from "~/shared/interfaces/Projects";
import { Loader } from "~/shared/components";
import styles from "./MainHub.module.scss";
import { useEffect, useState } from "react";

type MainHubProps = {
  projects: ProjectDataProps[];
  getProjects: () => void;
};

const MainHub = ({ projects, getProjects }: MainHubProps) => {
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 2000);
  }, []);

  return (
    <>
      <div
        className={styles.main}
        style={loading ? { display: "" } : { display: "none" }}
      >
        {projects.map((project, i) => {
          return <ProjectCard key={i} project={project} />;
        })}
        <CreateBoard getProjects={getProjects} />
      </div>
      {!loading && (
        <div className={styles["loader-container"]}>
          <Loader size={500} />
        </div>
      )}
    </>
  );
};

export default MainHub;

/*
  
  
  
  5) Add an edit section
        - Edit some of the details
        - Delete the project
  
  


*/
