import React from "react"
import "./DashboardDeadlines.scss"
import DeadlinesItem from "./Components/DeadlinesItem"
import moment from "moment"
import { projectData } from "../../../../../Interfaces"

const DashboardDeadlines = ({
  projectsData,
}: {
  projectsData: projectData
}) => {
  let date = moment().format("LL")

  let countoff = [1, 2, 3, 4, 5, 6]

  return (
    <div className="dashboard-deadlines-container">
      <div className="dashboard-deadlines-header">
        <h1>Upcoming Deadlines</h1>
        <p>{date}</p>
      </div>
      {countoff.map((num, i) => {
        if (projectsData.tasks[i]) {
          return (
            <DeadlinesItem
              key={i}
              date={projectsData.tasks[i].date}
              name={projectsData.tasks[i].name}
              task={projectsData.tasks[i]}
            />
          )
        } else {
          return <DeadlinesItem key={i} />
        }
      })}
    </div>
  )
}

export default DashboardDeadlines

/*
      Make color change from blue (if not late) or red (if late)
      Make sure it will still work without many tasks coming up 
*/
