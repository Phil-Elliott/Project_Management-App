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
        <Link
          to="/project/details"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-details-container">
            <h1>details</h1>
          </div>
        </Link>
        <Link
          to="/project/team"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-team-container">
            <h1>team</h1>
          </div>
        </Link>
        <Link
          to="/project/time"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-time-container">
            <h1>time</h1>
          </div>
        </Link>
      </div>
      <div className="dashboard-bottom-container">
        <Link
          to="/project/tasks"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-tasks-container">
            <h1>tasks</h1>
          </div>
        </Link>
        <Link
          to="/project/finance"
          style={{
            textDecoration: "none",
          }}
        >
          <div className="dashboard-finance-container">
            <h1>finance</h1>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Dashboard

/*
  - use grid and have 5 boxes 
  - 3 on the top and 2 on the bottom 
    
  top 
    - details 
    - team 
    - time 
  bottom (could even do two that are the same size)
    - tasks (big)
    - finances 



*/
