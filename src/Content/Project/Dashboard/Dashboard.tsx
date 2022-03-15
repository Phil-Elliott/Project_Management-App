import React from "react"
import "./Dashboard.scss"
import DashboardDetails from "./Components/DashboardDetails/DashboardDetails"
import DashboardDeadlines from "./Components/DashboardDeadlines/DashboardDeadlines"
import DashboardTasks from "./Components/DashboardTasks/DashboardTasks"
import DashboardTime from "./Components/DashboardTime/DashboardTime"

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-top-container">
        <DashboardDetails />
        <DashboardDeadlines />
      </div>
      <div className="dashboard-bottom-container">
        <DashboardTasks />
        <DashboardTime />
      </div>
    </div>
  )
}

export default Dashboard

/*

 
*/
