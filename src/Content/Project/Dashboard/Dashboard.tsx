import React from "react"
import "./Dashboard.scss"
import DashboardDetails from "./Components/DashboardDetails/DashboardDetails"
import DashboardFinance from "./Components/DashboardFinance/DashboardFinance"
import DashboardTasks from "./Components/DashboardTasks/DashboardTasks"
import DashboardTime from "./Components/DashboardTime/DashboardTime"
import DashboardTeam from "./Components/DashboardTeam/DashboardTeam"
import { Link } from "react-router-dom"

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-top-container">
        <div className="dashboard-details-container">
          <h1>details</h1>
        </div>
        <div className="dashboard-team-container">
          <h1>team</h1>
        </div>
        <div className="dashboard-time-container">
          <h1>time</h1>
        </div>
      </div>
      <div className="dashboard-bottom-container">
        <div className="dashboard-tasks-container">
          <h1>tasks</h1>
        </div>
        <div className="dashboard-finance-container">
          <h1>finance</h1>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

/*
 1) Break up into their folders
 2) Fill out the details section 
 
*/
