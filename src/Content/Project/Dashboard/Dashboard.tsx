import React from "react"
import "./Dashboard.scss"
import DashboardDetails from "./Components/DashboardDetails/DashboardDetails"
import DashboardFinance from "./Components/DashboardFinance/DashboardFinance"
import DashboardTasks from "./Components/DashboardTasks/DashboardTasks"
import DashboardTime from "./Components/DashboardTime/DashboardTime"
import DashboardTeam from "./Components/DashboardTeam/DashboardTeam"

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-top-container">
        <DashboardDetails />
        <DashboardTeam />
        <DashboardTime />
      </div>
      <div className="dashboard-bottom-container">
        <DashboardTasks />
        <DashboardFinance />
      </div>
    </div>
  )
}

export default Dashboard

/*
 2) Fill out the details section 
 
*/
