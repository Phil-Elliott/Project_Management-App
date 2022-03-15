import React from "react"
import "./DashboardTime.scss"
import DashboardDeadlines from "../DashboardDeadlines/DashboardDeadlines"
import { FaFlagCheckered } from "react-icons/fa"

const DashboardTime = () => {
  return (
    <div className="dashboard-time-container">
      <DashboardDeadlines />
      <div className="dashboard-time-right">
        <h1>Projected Launch Date</h1>
        <div className="dashboard-time-content">
          <FaFlagCheckered className="flag-icon" />
          <div>
            <p>182 Days</p>
            <p>Friday, December 15</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardTime

/*

  copy members section from ms planner 
  make everything responsive 
  make add project a modal 
    create logo, name, description, milestones, features 
  need a delete bttn on project in project hub 


  left section 
    - overall progress
      do half a doughnut graph with a meter going the percentage of tasks done 

  right section 
    - Projected launch date 
    - div
      flag on left or rocketship 
        div 
          days left 
          date of completion 



*/
