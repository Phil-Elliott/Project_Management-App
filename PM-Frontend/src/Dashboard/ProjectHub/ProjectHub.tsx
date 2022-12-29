import React, { useState } from "react";
import "./ProjectHub.scss";
import ProjectCard from "./Components/ProjectCard";
import ModalAddProject from "./Components/ModalAddProject/ModalAddProject";
import EditProjectModal from "./Components/ModalEditProject/EditProjectModal";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";

const ProjectHub = ({
  displayAddProjectModal,
  displayProjectModal,
  addProject,
  editProject,
  changeActiveTab,
  displayEditProjectModal,
  changeDisplayEditProjectModal,
  deleteProject,
}: {
  displayAddProjectModal: boolean;
  displayProjectModal: any;
  addProject: any;
  editProject: any;
  changeActiveTab: any;
  displayEditProjectModal: boolean;
  changeDisplayEditProjectModal: any;
  deleteProject: any;
}) => {
  const [editData, setEditData] = useState<number>(0);
  const projectsData = useSelector(
    (state: RootState) => state.projectsData.projects
  );

  let arrayForSort = [...projectsData];

  let newProjectsData = arrayForSort.sort((a, b) => {
    var dateA: any = new Date(a.launch);
    var dateB: any = new Date(b.launch);
    return dateA - dateB;
  });

  const openEditModal = (i: number) => {
    setEditData(i);
    changeDisplayEditProjectModal();
  };

  return (
    <div className="project-hub-main-container">
      <ModalAddProject
        displayAddProjectModal={displayAddProjectModal}
        displayProjectModal={displayProjectModal}
        addProject={addProject}
      />
      {projectsData.length > 0 && (
        <EditProjectModal
          displayEditProjectModal={displayEditProjectModal}
          changeDisplayEditProjectModal={changeDisplayEditProjectModal}
          editProject={editProject}
          projectData={newProjectsData[editData]}
          deleteProject={deleteProject}
        />
      )}
      {newProjectsData.map((project, i) => {
        return (
          <ProjectCard
            key={i}
            id={project.id}
            name={project.name}
            initials={project.initials}
            color={project.color}
            description={project.description}
            launch={project.launch}
            tasks={project.tasks}
            completed={project.completed}
            changeActiveTab={changeActiveTab}
            openEditModal={openEditModal}
            i={i}
          />
        );
      })}
    </div>
  );
};

export default ProjectHub;

/*

  name: "",
    initials: "",
    color: "green",
    description: "",
    launch: "",
    tasks: [],


    cards for every project 
      will pass an array with the correct details 


    card 
      p Project Name
      Doughnut graph 
        center 32 tasks left or no tasks 
        bottom 92 days left
      three sections 
          - border top (red, blue, green)
          - p number 0 
          - section of chart (late, in progress, completed) 

    1) Create the main container
    2) Create the first card 
    3) Put in project name and logo to its left 
    4) Import doughnut chart 
    5) Add to the center and days on bottom 
    6) Create the bottom section 

    1) Create an array of objects 
    2) Plug into card 
    3) Map through array and put card into its own component 
    4) Make it responsive 

*/
