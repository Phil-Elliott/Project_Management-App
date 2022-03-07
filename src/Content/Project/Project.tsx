import React from "react"
import "./Project.scss"
import Nav from "./Components/Nav"
import Dashboard from "./Dashboard/Dashboard"
import Details from "./Details/Details"
import Finance from "./Finance/Finance"
import Tasks from "./Tasks/Tasks"
import Team from "./Team/Team"
import Time from "./Time/Time"
import { Route, Routes } from "react-router-dom"

const Project = () => {
  return (
    <div className="main-project-container">
      <Nav />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/details" element={<Details />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/team" element={<Team />} />
        <Route path="/time" element={<Time />} />
      </Routes>
    </div>
  )
}

export default Project

/*
  could make a top nav as well 
    include project name and links to each of the sections for the project 
    Would need to change the routes 
    Would need to figure out how to make it responsive 

  Could be the header only on the products pages 
    Could maybe even use a modal instead of expanding on the details section 

  Could change the time section to schedule section 

  might just need a section for signing out 
    could change the person to a task and use the person to manage account 


    1) Create header for every page in the Project folder 
    2) Make header responsive
    3) Change links to the header 
    4) Create details section 
    5) Create Modal to edit the section 
*/
