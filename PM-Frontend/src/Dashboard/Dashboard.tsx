import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Project from "./components/Project/Project";
import ProjectHub from "./components/ProjectHub/ProjectHub";
import "./Dashboard.scss";
import { projectData } from "./Interfaces";
import {
  addNewProject,
  changeActiveProject,
  deleteProject,
  editProject,
  updateProjectData,
} from "./ProjectDataSlice";
import { RootState } from "./Store";

const Dashboard = () => {
  const [navClass, setNavClass] = useState("header unactive-side-nav");
  const [activeTab, setActiveTab] = useState<string>("");
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false);
  const [displayEditProjectModal, setDisplayEditProjectModal] =
    useState<boolean>(false);

  const activeProject = useSelector(
    (state: RootState) => state.projectsData.activeProject
  );
  const dispatch = useDispatch();

  // Adds a project to the projectsData array from addProjectModal
  const addProject = (project: projectData) => {
    dispatch(addNewProject(project));
    displayProjectModal();
  };

  // Edits a project to the projectsData array from editProjectModal
  const editTheProject = (project: projectData, name: string) => {
    dispatch(editProject({ project, name }));
    changeDisplayEditProjectModal();
  };

  // Deletes a project from the projectsData array
  const deleteTheProject = (name: string) => {
    dispatch(deleteProject(name));
    changeDisplayEditProjectModal();
  };

  // Changes the active tab when item is clicked on header
  const changeActiveTab = (name: string) => {
    setActiveTab(name);
    dispatch(changeActiveProject(name));
  };

  useEffect(() => {
    dispatch(changeActiveProject(activeTab));
  }, []);

  useEffect(() => {
    dispatch(updateProjectData(activeTab));
  }, [activeProject]);

  // Used to display the responsive nav
  const changeClass = () => {
    navClass === "header unactive-side-nav"
      ? setNavClass("header active-side-nav")
      : setNavClass("header unactive-side-nav");
  };

  // Displays the add project modal
  const displayProjectModal = () => {
    setDisplayAddProjectModal(!displayAddProjectModal);
  };
  const changeDisplayEditProjectModal = () => {
    setDisplayEditProjectModal(!displayEditProjectModal);
  };

  return (
    <div className="dashboard-container">
      <Layout
        navClass={navClass}
        displayProjectModal={displayProjectModal}
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        changeClass={changeClass}
      >
        <div className="content">
          <Routes>
            <Route
              path="/"
              element={
                <ProjectHub
                  displayAddProjectModal={displayAddProjectModal}
                  displayProjectModal={displayProjectModal}
                  addProject={addProject}
                  editProject={editTheProject}
                  deleteProject={deleteTheProject}
                  changeActiveTab={changeActiveTab}
                  displayEditProjectModal={displayEditProjectModal}
                  changeDisplayEditProjectModal={changeDisplayEditProjectModal}
                />
              }
            />
            <Route path="/project/*" element={<Project />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;

/*

     1) Create a new repo 
     2) Delete all and add in slowly 
            - test throughout

*/
