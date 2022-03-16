import React, { useState } from "react"
import "./App.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { projectData } from "./Interfaces"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  const [navClass, setNavClass] = useState("header unactive-side-nav")
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false)
  const [projectsData, setProjectsData] = useState<Array<projectData>>([])

  const changeClass = () => {
    navClass === "header unactive-side-nav"
      ? setNavClass("header active-side-nav")
      : setNavClass("header unactive-side-nav")
  }

  const displayProjectModal = () => {
    setDisplayAddProjectModal(!displayAddProjectModal)
  }

  // Adds a project to the projectsData array from addProjectModal
  const addProject = (project: any) => {
    let newArr = projectsData
    newArr.push(project)
    setProjectsData(newArr)
    console.log(projectsData)
    displayProjectModal()
  }

  return (
    <div className="App">
      <Router>
        <ResponsiveHeader changeClass={changeClass} />
        <Header navClass={navClass} displayProjectModal={displayProjectModal} />
        <Content
          displayAddProjectModal={displayAddProjectModal}
          displayProjectModal={displayProjectModal}
          addProject={addProject}
        />
      </Router>
    </div>
  )
}

export default App
/*
    
  [
    {
      ... details 
      tasks: [
        [
          {
            ... task details
          }, 
          {
            ... task comments
          }
        ]
      ]
    }
  ]




      Fix top right responsive header links 
        copy stuff from other header 
        connect modal for add to it 



    Finish first phase of project 
      1)  - Display that to project hub 
          - display to header 
          - Display to dashboard 
      




      2) Connect to project hub 
      3) Connect project hub to dashboard 
      4) Have project display on header and project hub 
      5) Allow details to be edited on project hub 
      6) Have tasks add to project data 
      7) Make tasks display info on dashboard 
      8) Create comments section 
      9) Fix up ui and add favicon 

*/
