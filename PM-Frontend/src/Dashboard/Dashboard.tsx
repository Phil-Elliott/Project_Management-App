import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import "./Dashboard.scss";
import Layout from "./Layout/Layout";
import LayoutOld from "./LayoutOld/Layout";
import MainHub from "./MainHub/MainHub";
import { Board, Display, ProjectLayout } from "./Project";
import { RootState } from "./Store";

const Dashboard = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.project.projects);

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // All Header Stuff
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [navClass, setNavClass] = useState("header unactive-side-nav");
  const [activeTab, setActiveTab] = useState<string>("");
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false);

  // Changes the active tab when item is clicked on header
  const changeActiveTab = (name: string) => {
    setActiveTab(name);
    // dispatch(changeActiveProject(name));
  };

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
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    console.log("projects", projects);
  }, [projects]);

  return (
    <div className="dashboard-container">
      {/* <LayoutOld
        navClass={navClass}
        changeClass={changeClass}
        activeTab={activeTab}
        changeActiveTab={changeActiveTab}
        displayProjectModal={displayProjectModal}
      > */}
      <Layout>
        <div className="content">
          <Routes>
            <Route path="/" element={<MainHub projects={projects} />} />
            <Route
              path="/:id"
              element={<ProjectLayout projectsData={projects} />}
            >
              <Route index element={<Board />} />
              {/* <Route path="board" element={<Board />} /> */}
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Layout>
      {/* </LayoutOld> */}
    </div>
  );
};

export default Dashboard;

/*
  Fix up projecthub
  Make add project modal 
  Make edit project modal 
  Add more functionality to task section
  Make everything responsive

  Fix up signin page
  Connect to a database

  Make sure all data in the app works with the database

  Make a landing page

  Continue to add functionality 
  Maybe add a dashboard for each project



*/
