import React, { useState } from "react"
import "./App.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { projectData } from "./Interfaces"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  const [navClass, setNavClass] = useState("header unactive-side-nav")
  const [activeTab, setActiveTab] = useState<string>("Big project")
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false)
  const [projectsData, setProjectsData] = useState<Array<projectData>>([
    {
      name: "Super Cool Project",
      initials: "OE",
      color: "blue",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-04-16",
      tasks: [],
      completed: [],
    },
  ])
  const [activeProject, setActiveProject] = useState<projectData>({
    name: "Super Cool Project",
    initials: "OE",
    color: "blue",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    launch: "2022-04-16",
    tasks: [],
    completed: [],
  })

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

  // Adds a project to the projectsData array from addProjectModal
  const addProject = (project: any) => {
    let newArr = projectsData
    newArr.push(project)
    setProjectsData(newArr)
    console.log(projectsData)
    displayProjectModal()
  }

  // Change active project when new project is selected
  const changeActiveProject = (name: string) => {
    let newObj = projectsData.find((project) => {
      return project.name === name
    })
    newObj && setActiveProject(newObj)
  }

  // Changes the active tab when item is clicked on header
  const changeActiveTab = (name: string) => {
    setActiveTab(name)
    changeActiveProject(name)
    console.log(activeProject)
  }

  return (
    <div className="App">
      <Router>
        <ResponsiveHeader changeClass={changeClass} />
        <Header
          navClass={navClass}
          displayProjectModal={displayProjectModal}
          projectsData={projectsData}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        />
        <Content
          displayAddProjectModal={displayAddProjectModal}
          displayProjectModal={displayProjectModal}
          addProject={addProject}
          projectsData={projectsData}
          activeProject={activeProject}
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
                {
                  ... task details
                  taskCommnets []
                }, 
             ]
      completed tasks: [                         
                        {
                          completed tasks
                          task comments []
                        }
                      ]
      ]
    }
  ]

  Have name pass to a function on the app page 
    

    - can use the same function when I click on one of the projects from the project hub page 

    - have tasks get added to array somehow 
      - could have everything go all the way back to the app page 

    - plug in the tasks data to populate in project 
    - use this data to finish off dashboard 
    - also use this data to finish off project hub page 


      Fix top right responsive header links 
        copy stuff from other header 
        connect modal for add to it 

    Need to fixup input areas to only take a certain amount of characters 
    also need to make sure they are filled in 



    Finish first phase of project 
      1)  
          
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
