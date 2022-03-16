import React from "react"
import "./Project.scss"
import Nav from "./Components/Nav"
import Dashboard from "./Dashboard/Dashboard"
import Tasks from "./Tasks/Tasks"
import { Route, Routes } from "react-router-dom"

const Project = () => {
  return (
    <div className="main-project-container">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </div>
  )
}

export default Project

/*
  
    4) Create details section 
    5) Create Modal to edit the section 
*/
