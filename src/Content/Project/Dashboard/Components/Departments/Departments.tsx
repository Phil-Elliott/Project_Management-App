import React from "react"
import "./Departments.scss"
import BarChart from "./Components/Barchart"

const Departments = () => {
  return (
    <div className="dashboard-departments-container">
      <h1>Departments Work Load</h1>
      <BarChart />
    </div>
  )
}

export default Departments

/*
      1) header (members)
      2) sideways bar graph (chart.js)

*/
