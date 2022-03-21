import React from "react"
import ChartMain from "./Chart"
import { projectData } from "../../../Interfaces"
import moment from "moment"

const ProjectCard = ({
  name,
  initials,
  description,
  color,
  launch,
  tasks,
  completed,
}: projectData) => {
  // Finds the difference between launch date and current date in days
  const getTimeDiff = (date: string) => {
    let launch = moment(date).format("L")
    let days = moment(launch, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  let count = 0
  tasks.map((task) => {
    let timeDiff = getTimeDiff(task.date)
    if (timeDiff < 0) {
      return count++
    }
  })

  return (
    <div className="project-hub-card-container">
      <div className="project-hub-card-header">
        <div className="nav-logo" style={{ backgroundColor: color }}>
          <p>{initials}</p>
        </div>
        <h1>{name}</h1>
      </div>
      <ChartMain
        tasks={tasks}
        late={count}
        progress={tasks.length - count}
        completed={completed.length}
      />
      <div className="project-hub-card-days">
        <p>{getTimeDiff(launch)} Days Left</p>
      </div>
      <div className="project-hub-card-bottom">
        <div className="card-bottom-red">
          <p>{count}</p>
          <p>Late</p>
        </div>
        <div className="card-bottom-blue">
          <p>{tasks.length - count}</p>
          <p>In Progress</p>
        </div>
        <div className="card-bottom-green">
          <p>{completed.length}</p>
          <p>Completed</p>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard

/*
    figure out late progress and completed 
    make sure tasks go into chart correctly


*/
