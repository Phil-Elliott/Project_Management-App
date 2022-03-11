import React from "react"
import "./DashboardFinance.scss"
import Chart from "./Components/Chart"

const DashboardFinance = () => {
  return (
    <div className="dashboard-finance-container">
      <h1>Recently completed tasks</h1>
      {/* <div className="dashboard-finance-content">
        <div className="dashboard-finance-graph">
          <Chart />
        </div>
        <div className="dashboard-finance-details">
          <div className="budget">
            <p>Total Budget</p>
            <p>$52,000</p>
          </div>
          <div className="remaining">
            <p>Remaining</p>
            <p>$8,770</p>
          </div>
          <div className="currently">
            <p>Currently</p>
            <div className="currently-results">
              <p>8.1%</p>
              <p>Over Target</p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  )
}

export default DashboardFinance

/*
  1) Left side (details)
    Total budget 
    Remaining 
    Currently (on target, below target, over target - have color codes
      blue, green, red)
  2) Right Side (graph)
    - Spent 
    - Expected 


  Can add things on the actual finance page 
      have an actual budget and then you can add in as you go 
*/
