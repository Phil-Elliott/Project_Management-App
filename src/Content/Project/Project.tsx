import React from "react"
import "./Project.scss"
import Dashboard from "./Dashboard/Dashboard"
import Details from "./Details/Details"
import Finance from "./Finance/Finance"
import Tasks from "./Tasks/Tasks"
import Team from "./Team/Team"
import Time from "./Time/Time"
import { Route, Routes } from "react-router-dom"

const Project = () => {
  return (
    <div>
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
