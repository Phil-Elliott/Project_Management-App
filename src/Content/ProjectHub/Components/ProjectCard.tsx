import React from "react"
import ChartMain from "./Chart"
import { projectData } from "../../../Interfaces"
import moment from "moment"
import { FaEllipsisV } from "react-icons/fa"
import { Link } from "react-router-dom"

const ProjectCard = ({
  name,
  initials,
  description,
  color,
  launch,
  tasks,
  completed,
  changeActiveTab,
  openEditModal,
  i,
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

  const openEdit = () => {
    openEditModal(i)
  }

  return (
    <div className="project-hub-card-container">
      <div className="project-hub-card-header">
        <div
          className="nav-logo"
          style={{ backgroundColor: color, borderRadius: "3px" }}
        >
          <p>{initials}</p>
        </div>
        <div className="project-hub-card-header-right">
          <h1>{name}</h1>
          <FaEllipsisV
            className="project-hub-card-header-right-ellipsis"
            onClick={() => openEdit()}
          />
        </div>
      </div>
      <Link
        onClick={() => changeActiveTab(name)}
        to="/project"
        style={{
          textDecoration: "none",
          color: "black",
          width: "100%",
        }}
      >
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
      </Link>
    </div>
  )
}

export default ProjectCard

/*
  Make the elipsis open up the edit modal 
  use the same modal as before but change a few things 
  copy the way you did it with tasks 


*/
