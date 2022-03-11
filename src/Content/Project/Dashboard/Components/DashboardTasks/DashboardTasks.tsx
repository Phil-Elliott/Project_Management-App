import React from "react"
import "./DashboardTasks.scss"

const DashboardTasks = () => {
  const tasksNumArr = [
    {
      title: "Completed tasks",
      number: 100,
      color: "green",
    },
    {
      title: "Incomplete tasks",
      number: 22,
      color: "blue",
    },
    {
      title: "Overdue tasks",
      number: 4,
      color: "red",
    },
    {
      title: "Total tasks",
      number: 122,
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
  Map thorugh 
  Think about changing colors of numbers 
  Make responsive 
  Move on 

*/
