import React from "react";
import "./Display.scss";
// import DashboardDetails from "./Components/DashboardDetails/DashboardDetails";
// import DashboardDeadlines from "./Components/DashboardDeadlines/DashboardDeadlines";
// import DashboardTasks from "./Components/DashboardTasks/DashboardTasks";
// import DashboardTime from "./Components/DashboardTime/DashboardTime";
import { RootState } from "../../Store";
import { useSelector } from "react-redux";
import Nav from "../Nav/Nav";

const Display = () => {
  const projectsData = useSelector(
    (state: RootState) => state.projectsData.activeProject
  );
  return (
    <div>
      <Nav />
      <div className="dashboard-main-container">
        <div className="dashboard-top-container">
          {/* <DashboardDetails description={projectsData.description} />
          <DashboardDeadlines projectsData={projectsData} /> */}
        </div>
        <div className="dashboard-bottom-container">
          {/* <DashboardTasks projectsData={projectsData} />
          <DashboardTime launch={projectsData.launch} /> */}
        </div>
      </div>
    </div>
  );
};

export default Display;
