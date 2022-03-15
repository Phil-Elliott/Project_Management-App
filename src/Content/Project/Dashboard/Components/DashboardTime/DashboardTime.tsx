import React from "react"
import "./DashboardTime.scss"

const DashboardTime = () => {
  return (
    <div className="dashboard-time-container">
      <div className="dashboard-time-left">
        <h1>Overall Progress</h1>
      </div>
      <div className="dashboard-time-right">
        <h1>Product Launch Date</h1>
        <div>
          <p>Img</p>
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
