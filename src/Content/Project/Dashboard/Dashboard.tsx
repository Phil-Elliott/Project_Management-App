import React from "react"
import "./Dashboard.scss"
import DashboardDetails from "./Components/DashboardDetails/DashboardDetails"
import DashboardFinance from "./Components/DashboardFinance/DashboardFinance"
import DashboardTasks from "./Components/DashboardTasks/DashboardTasks"
import DashboardTime from "./Components/DashboardTime/DashboardTime"

const Dashboard = () => {
  return (
    <div className="dashboard-main-container">
      <div className="dashboard-top-container">
        <DashboardDetails />
        <DashboardFinance />
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
