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
          changeActiveTab={changeActiveTab}
        />
      </Router>
    </div>
  )
}

export default App
/*
  




    Finish first phase of project 
     
      3) Need to make edit bttn for projecthub cards (edit, delete)
        - could use elipsis for this or have edit take care of it on dash
        - could just do on the side 

                1) Add elipsis 
                2) Add dropdown for elipsis (edit and delete)
                3) Edit - opens same modal with edit on top and previous inputs
                4) Delete just deletes from main project array 


      4) dashboard 
            - have modal for description 
            - have edit button work for details   
       
      6) Play around with UI
      7) Add comments section 
      
    
    Phase 2 
      1) Add comments 
      2) Do testing
      3) Allow project hub to edit projects 
      4) Fix performance 
      5) Hook up to a backend (firebase)
      6) Add form validation 
      7) Play around with other hooks 
      

*/
