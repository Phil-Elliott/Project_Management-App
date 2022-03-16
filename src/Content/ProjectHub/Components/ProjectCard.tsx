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
}: projectData) => {
  // Finds the difference between launch date and current date in days
  const getTimeDiff = (date: string) => {
    let launch = moment(date).format("L")
    let days = moment(launch, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  return (
    <div className="project-hub-card-container">
      <div className="project-hub-card-header">
        <div className="nav-logo" style={{ backgroundColor: color }}>
          <p>{initials}</p>
        </div>
        <h1>{name}</h1>
      </div>
      <ChartMain tasks={tasks} />
      <div className="project-hub-card-days">
        <p>{getTimeDiff(launch)} Days Left</p>
      </div>
      <div className="project-hub-card-bottom">
        <div className="card-bottom-red">
          <p>1</p>
          <p>Late</p>
        </div>
        <div className="card-bottom-blue">
          <p>22</p>
          <p>In Progress</p>
        </div>
        <div className="card-bottom-green">
          <p>83</p>
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
