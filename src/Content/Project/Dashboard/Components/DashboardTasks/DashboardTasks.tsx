import React, { useEffect } from "react"
import "./DashboardTasks.scss"
import moment from "moment"
import { projectData } from "../../../../../Interfaces"

const DashboardTasks = ({ projectsData }: { projectsData: projectData }) => {
  // Finds the difference between due date and current date in days
  const getTimeDiff = (date: string) => {
    let dueDate = moment(date).format("L")
    let days = moment(dueDate, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }
  let count = 0
  projectsData.tasks.map((task) => {
    let timeDiff = getTimeDiff(task.date)
    if (timeDiff < 0) {
      return count++
    }
  })

  const tasksNumArr = [
    {
      title: "Completed tasks",
      number: projectsData.completed.length,
      color: "green",
    },
    {
      title: "Incomplete tasks",
      number: projectsData.tasks.length,
      color: "blue",
    },
    {
      title: "Overdue tasks",
      number: count,
      color: "red",
    },
    {
      title: "Total tasks",
      number: projectsData.tasks.length + projectsData.completed.length,
      color: "black",
    },
  ]

  return (
    <div className="dashboard-tasks-container">
      {tasksNumArr.map((item, i) => {
        return (
          <div className="dashboard-tasks-content-container">
            <h1>{item.title}</h1>
            <p style={{ color: item.color }} className="dashboard-tasks-number">
              {item.number}
            </p>
            <p>Task Count</p>
          </div>
        )
      })}
    </div>
  )
}

export default DashboardTasks

/*  
  Figure out what is late 

    can use the same equation thats in the tasks section component 
    

*/
