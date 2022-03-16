import React from "react"
import "./ProjectHub.scss"
import ProjectCard from "./Components/ProjectCard"
import { projectData } from "../../Interfaces"
import ModalAddProject from "./Components/ModalAddProject/ModalAddProject"

const ProjectHub = ({
  displayAddProjectModal,
  displayProjectModal,
  addProject,
  projectsData,
}: {
  displayAddProjectModal: boolean
  displayProjectModal: any
  addProject: any
  projectsData: Array<projectData>
}) => {
  return (
    <div className="project-hub-main-container">
      <ModalAddProject
        displayAddProjectModal={displayAddProjectModal}
        displayProjectModal={displayProjectModal}
        addProject={addProject}
      />
      {projectsData.map((project, i) => {
        return (
          <ProjectCard
            key={i}
            name={project.name}
            initials={project.initials}
            color={project.color}
            description={project.description}
            launch={project.launch}
            tasks={project.tasks}
          />
        )
      })}
    </div>
  )
}

export default ProjectHub

/*

  name: "",
    initials: "",
    color: "green",
    description: "",
    launch: "",
    tasks: [],


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
