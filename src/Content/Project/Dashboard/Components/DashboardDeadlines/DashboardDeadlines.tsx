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

  let arrayForSort = [...projectsData.tasks]

  let newTasksData = arrayForSort.sort((a, b) => {
    var dateA: any = new Date(a.date)
    var dateB: any = new Date(b.date)
    return dateA - dateB
  })

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
              date={newTasksData[i].date}
              name={newTasksData[i].name}
              task={newTasksData[i]}
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
