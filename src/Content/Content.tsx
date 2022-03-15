import React from "react"
import "./Content.scss"
// import MyTasks from "./MyTasks/MyTasks"
import NewProject from "./NewProject/NewProject"
import Project from "./Project/Project"
import ProjectHub from "./ProjectHub/ProjectHub"
// import Account from "./Account/Account"
import { Route, Routes } from "react-router-dom"

const Content = () => {
  return (
    <main className="content">
      <Routes>
        <Route path="/" element={<ProjectHub />} />
        <Route path="/new" element={<NewProject />} />
        {/* <Route path="/tasks" element={<MyTasks />} />
        <Route path="/account" element={<Account />} /> */}
        <Route path="/project/*" element={<Project />} />
      </Routes>
    </main>
  )
}

export default Content

/*
  put upcoming events section on dashboard top right 
    same as other dashboard but can delete and edit 
  
  make buttom right bigger 

  schedule 
    have a calander with different events and interactive 

  tasks 
    make cards look better and give it functionality 

  copy cards from ms planner for hub 

  create the create project page and have 
    - name 
    - logo 
    - description 
    - key features 
    - milestones 

  put milestones into our project on dashboard 


  could also do a table that includes recently completed tasks 
    could have completed date on left 
    border right 
    task completed 
    person or team who completed task on right 


*/
