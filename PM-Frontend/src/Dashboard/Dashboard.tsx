import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import "./Dashboard.scss";
import { projectData } from "./Interfaces";

import Layout from "./Layout/Layout";
import { Board, Display, ProjectLayout } from "./Project";

import {
  addNewProject,
  changeActiveProject,
  deleteProject,
  editProject,
  updateProjectData,
} from "./ProjectDataSlice";
import ProjectHub from "./ProjectHub/ProjectHub";
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

  const projectsData = useSelector(
    (state: RootState) => state.projectsData.projects
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
            <Route
              path="/:id"
              element={<ProjectLayout projectsData={projectsData} />}
            >
              <Route index element={<Display />} />
              <Route path="board" element={<Board />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
    </div>
  );
};

export default Dashboard;

/*
  add a spinner on load



     1) Fix up both navs 
     2) Add some basic tests for navs (maybe) 
     3) Figure out the data structure for the project data
     4) Create some test data 
     5) Start creating the board
          - Make the folder structure for the board
          - Create the board component



  notes or comments


*/

/*

{
      name: "Transfer Files",
      id: "1",
      background: "can be a color or an image(options for images)",
      notes: [
        {
          id: "1",
          title: "Transfer Files",
          member: "John Doe",
          description: "Transfer files from old computer to new computer",
          urgency: "high",
          comments: [
            {
              id: "1",
              member: "John Doe",
              comment: "This is a comment",
            },
          ]
        },
      ],
      tasks: [
        {
          id: "1",
          name: "Decide on what to transfer",
          assignedTo: ["John Doe", "Jane Doe"],
          description: "Decide on what to transfer",
          due: "2021-01-01",
          list: "Done",
          comments: [
            {
              id: "1",
              member: "John Doe",
              comment: "This is a comment",
            },
          ], 
      ]
      tasks: [
        {
          name: "Decide on what to transfer",
          department: "Accounting",
          date: "2022-05-24",
          assigned: "John Ellie",
          comments: [
            {
              name: "Bob Tyler",
              date: "March 18, 2022 12:54 PM",
              comment: "We might need to change the deadline to a later date.",
            },
            {
              name: "Darrel Kent",
              date: "March 18, 2022 2:17 PM",
              comment:
                "That is not a problem Bob. Just let me know when the new deadline will be.",
            },
          ],
        },
        {
          name: "Call about files",
          department: "Sales",
          date: "2022-04-27",
          assigned: "Tim",
          comments: [],
        },
        {
          name: "Figure out a structure",
          department: "Marketing",
          date: "2022-07-18",
          assigned: "Josh Sterling",
          comments: [],
        },
        {
          name: "Delete unnecessary files",
          department: "Accounting",
          date: "2022-04-06",
          assigned: "Lisa Atkins",
          comments: [
            {
              name: "Sarah Evans",
              date: "March 29, 2022 7:54 AM",
              comment: "Which files should we start with?",
            },
            {
              name: "Dan Thompson",
              date: "March 29, 2022 12:17 PM",
              comment:
                "Start with the oldest files in the system and make sure they have already been backed up.",
            },
            {
              name: "Marry Glass",
              date: "March 29, 2022 2:24 PM",
              comment: "I will be able to help starting tomorrow afternoon.",
            },
            {
              name: "Sarah Evans",
              date: "March 29, 2022 4:31 PM",
              comment: "Thanks Marry",
            },
          ],
        },
        {
          name: "Hire new employee",
          department: "Human Resources",
          date: "2022-04-14",
          assigned: "Tracy Daniels",
          comments: [],
        },
        {
          name: "Track progress",
          department: "Management",
          date: "2022-04-18",
          assigned: "Mark Stein",
          comments: [],
        },
        {
          name: "Sign documents",
          department: "Marketing",
          date: "2022-03-20",
          assigned: "Josh Peck",
          comments: [],
        },
        {
          name: "Meet clients",
          department: "Sales",
          date: "2022-03-08",
          assigned: "Diane",
          comments: [],
        },
        {
          name: "Fix UI",
          department: "Marketing",
          date: "2022-04-09",
          assigned: "Jose Nunez",
          comments: [],
        },
      ],
    },

    
*/
