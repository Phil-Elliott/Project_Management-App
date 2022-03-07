import React from "react"
import "./Content.scss"
import MyTasks from "./MyTasks/MyTasks"
import NewProject from "./NewProject/NewProject"
import Project from "./Project/Project"
import ProjectHub from "./ProjectHub/ProjectHub"
import { Route, Routes } from "react-router-dom"

const Content = () => {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<ProjectHub />} />
        <Route path="/new" element={<NewProject />} />
        <Route path="/tasks" element={<MyTasks />} />
        <Route path="/project/*" element={<Project />} />
      </Routes>
    </main>
  )
}

export default Content
