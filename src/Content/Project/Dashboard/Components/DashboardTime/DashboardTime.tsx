import React from "react"
import "./DashboardTime.scss"
import Departments from "../Departments/Departments"
import { FaFlagCheckered } from "react-icons/fa"
import moment from "moment"

const DashboardTime = ({ launch }: { launch: string }) => {
  // Finds the difference between launch date and current date in days
  const getTimeDiff = (date: string) => {
    let launch = moment(date).format("L")
    let days = moment(launch, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  let launchDate = moment(launch).format("LL")

  return (
    <div className="dashboard-time-container">
      <Departments />
      <div className="dashboard-time-right">
        <h1>Projected Launch Date</h1>
        <div className="dashboard-time-content">
          <FaFlagCheckered className="flag-icon" />
          <div>
            <p className="dashboard-time-content-top">
              {getTimeDiff(launch)} Days
            </p>
            <p>{launchDate}</p>
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
