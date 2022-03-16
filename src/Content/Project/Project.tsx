import React from "react"
import "./Project.scss"
import Nav from "./Components/Nav"
import Dashboard from "./Dashboard/Dashboard"
import Tasks from "./Tasks/Tasks"
import { Route, Routes } from "react-router-dom"

const Project = ({ projectsData }: { projectsData: any }) => {
  return (
    <div className="main-project-container">
      <Nav projectsData={projectsData} />
      <Routes>
        <Route path="/" element={<Dashboard projectsData={projectsData} />} />
        <Route path="/tasks" element={<Tasks projectsData={projectsData} />} />
      </Routes>
    </div>
  )
}

export default Project

/*
  
    4) Create details section 
    5) Create Modal to edit the section 
*/
