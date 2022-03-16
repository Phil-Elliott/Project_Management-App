import React from "react"
import "./ProjectHub.scss"
import ChartMain from "./Components/Chart"
import ModalAddProject from "./Components/ModalAddProject/ModalAddProject"

const ProjectHub = ({
  displayAddProjectModal,
  displayProjectModal,
  addProject,
}: {
  displayAddProjectModal: boolean
  displayProjectModal: any
  addProject: any
}) => {
  return (
    <div className="project-hub-main-container">
      <ModalAddProject
        displayAddProjectModal={displayAddProjectModal}
        displayProjectModal={displayProjectModal}
        addProject={addProject}
      />
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
      <div className="project-hub-card-container">
        <div className="project-hub-card-header">
          <div className="nav-logo">
            <p>PN</p>
          </div>
          <h1>Office 365 for Exchange</h1>
        </div>
        <ChartMain />
        <div className="project-hub-card-days">
          <p>92 Days Left</p>
        </div>
        <div className="project-hub-card-bottom">
          <div className="card-bottom-red">
            <p>1</p>
            <p>Late</p>
          </div>
          <div className="card-bottom-blue">
            <p>22</p>
            <p>In Progress</p>
          </div>
          <div className="card-bottom-green">
            <p>83</p>
            <p>Completed</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectHub

/*
    cards for every project 
      will pass an array with the correct details 


    card 
      p Project Name
      Doughnut graph 
        center 32 tasks left or no tasks 
        bottom 92 days left
      three sections 
          - border top (red, blue, green)
          - p number 0 
          - section of chart (late, in progress, completed) 

    1) Create the main container
    2) Create the first card 
    3) Put in project name and logo to its left 
    4) Import doughnut chart 
    5) Add to the center and days on bottom 
    6) Create the bottom section 

    1) Create an array of objects 
    2) Plug into card 
    3) Map through array and put card into its own component 
    4) Make it responsive 

*/
