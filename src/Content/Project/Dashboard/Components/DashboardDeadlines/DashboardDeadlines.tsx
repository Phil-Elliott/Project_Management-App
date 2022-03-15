import React from "react"
import "./DashboardDeadlines.scss"
import DeadlinesItem from "./Components/DeadlinesItem"
import moment from "moment"

const DashboardDeadlines = () => {
  let date = moment().format("LL")

  return (
    <div className="dashboard-deadlines-container">
      <div className="dashboard-deadlines-header">
        <h1>Upcoming Deadlines</h1>
        <p>{date}</p>
      </div>
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
      <DeadlinesItem />
    </div>
  )
}

export default DashboardDeadlines

/*
      Make color change from blue (if not late) or red (if late)
      Make sure it will still work without many tasks coming up 
*/
