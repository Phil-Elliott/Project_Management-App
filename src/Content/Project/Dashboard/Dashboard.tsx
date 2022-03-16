import React from "react"
import "./Dashboard.scss"
import DashboardDetails from "./Components/DashboardDetails/DashboardDetails"
import DashboardDeadlines from "./Components/DashboardDeadlines/DashboardDeadlines"
import DashboardTasks from "./Components/DashboardTasks/DashboardTasks"
import DashboardTime from "./Components/DashboardTime/DashboardTime"
import { projectData } from "../../../Interfaces"

const Dashboard = ({ projectsData }: { projectsData: projectData }) => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-top-container">
        <DashboardDetails description={projectsData.description} />
        <DashboardDeadlines />
      </div>
      <div className="dashboard-bottom-container">
        <DashboardTasks />
        <DashboardTime launch={projectsData.launch} />
      </div>
    </div>
  )
}

export default Dashboard

/*

 
*/
