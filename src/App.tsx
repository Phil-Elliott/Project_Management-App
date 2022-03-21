import React, { useState, useEffect } from "react"
import "./App.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { projectData } from "./Interfaces"
import { BrowserRouter as Router } from "react-router-dom"

import { RootState } from "./Store"
import { useSelector, useDispatch } from "react-redux"
import {
  addNewProject,
  changeActiveProject,
  updateProjectData,
} from "./ProjectDataSlice"

function App() {
  const [navClass, setNavClass] = useState("header unactive-side-nav")
  const [activeTab, setActiveTab] = useState<string>("")
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false)

  const activeProject = useSelector(
    (state: RootState) => state.projectsData.activeProject
  )
  const dispatch = useDispatch()

  // Adds a project to the projectsData array from addProjectModal
  const addProject = (project: projectData) => {
    dispatch(addNewProject(project))
    displayProjectModal()
  }

  // Changes the active tab when item is clicked on header
  const changeActiveTab = (name: string) => {
    setActiveTab(name)
    dispatch(changeActiveProject(name))
  }

  useEffect(() => {
    dispatch(changeActiveProject(activeTab))
  }, [])

  useEffect(() => {
    dispatch(updateProjectData(activeTab))
  }, [activeProject])

  // Used to display the responsive nav
  const changeClass = () => {
    navClass === "header unactive-side-nav"
      ? setNavClass("header active-side-nav")
      : setNavClass("header unactive-side-nav")
  }

  // Displays the add project modal
  const displayProjectModal = () => {
    setDisplayAddProjectModal(!displayAddProjectModal)
  }

  return (
    <div className="App">
      <Router>
        <ResponsiveHeader
          changeClass={changeClass}
          displayProjectModal={displayProjectModal}
        />
        <Header
          navClass={navClass}
          displayProjectModal={displayProjectModal}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
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
    fix dates on task page 
      somehow decide when the last monday was and add 7 days to that 


    Finish first phase of project 
      
      5) fix dates of tasks (need to maybe make new conditional with mon date)


      8) Allow projects to open from projecthub
            - need to figure out active tab 
            - could use link as well to go there
      9) Need to make edit bttn for projecthub cards (edit, delete, move - difficult but cool )
        - could use elipsis for this
      10) dashboard 
            - have modal for description 
            - have buttons work for details 
            - have chart display correct info 

      11) Organize projects based off of due date 
          try to use the sort function again 
      12) Fix amount of characters going into inputs  
      14) add modal with features and milestones 
    
    Phase 2 
      1) Add comments 
      2) Do testing 
      3) Fix dashboard top 

*/
