import React, { useState, useEffect } from "react"
import "./App.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { projectData, tasksData } from "./Interfaces"
import { BrowserRouter as Router } from "react-router-dom"

function App() {
  const [navClass, setNavClass] = useState("header unactive-side-nav")
  const [activeTab, setActiveTab] = useState<string>("Super Cool Project")
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
  }

  useEffect(() => {
    setProjectsData([
      ...projectsData.map((project) => {
        if (project.name === activeTab) {
          return (project = activeProject)
        } else {
          return project
        }
      }),
    ])
  }, [activeProject])

  // Adds a task to the taskData array from Modal
  const addTask = (task: tasksData) => {
    setActiveProject({
      ...activeProject,
      tasks: [...activeProject.tasks, task],
    })
  }

  // Deletes a task from the taskData array - from taskCard component
  const deleteTask = (name: string) => {
    setActiveProject({
      ...activeProject,
      tasks: [
        ...activeProject.tasks.filter((task) => {
          return task.name !== name
        }),
      ],
    })
  }

  // Edits a task
  const editTask = (taskData: tasksData, name: string) => {
    setActiveProject({
      ...activeProject,
      tasks: [
        ...activeProject.tasks.map((task) => {
          if (task.name === name) {
            return (task = taskData)
          } else {
            return task
          }
        }),
      ],
    })
  }

  // Deletes a task from the completed tasks data array
  const deleteComlpletedTask = (name: string) => {
    setActiveProject({
      ...activeProject,
      completed: [
        ...activeProject.completed.filter((task) => {
          return task.name !== name
        }),
      ],
    })
  }

  // Moves a task to the completed array
  const completeTask = (task: any, name: string, complete: boolean) => {
    if (!complete) {
      setActiveProject({
        ...activeProject,
        tasks: [
          ...activeProject.tasks.filter((task) => {
            return task.name !== name
          }),
        ],
        completed: [...activeProject.completed, task],
      })
    } else {
      setActiveProject({
        ...activeProject,
        tasks: [...activeProject.tasks, task],
        completed: [
          ...activeProject.completed.filter((task) => {
            return task.name !== name
          }),
        ],
      })
    }
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
          addTask={addTask}
          deleteTask={deleteTask}
          deleteComlpletedTask={deleteComlpletedTask}
          completeTask={completeTask}
          editTask={editTask}
        />
      </Router>
    </div>
  )
}

export default App
/*
    need to figure out how to put array in order by dates 
      can first do this on app page 
          maybe use sort ...blah.tasks.sort





    fix dates on task page 
      somehow decide when the last monday was and add 7 days to that 


    Finish first phase of project 
      1) Fix links (highlight appropriate ones on start and refresh)
            use useeffect to set it on render 
      2) Change color of scrollbars 
      3) Fix top links when responsive 
      4) Make inputs mandatory 
      5) Could have error messages 
      6) Add Redux 
      7) Make tasks display info on dashboard 
      8) Allow projects to open from projecthub
      9) Need to make edit bttn for projecthub cards 
    
    Phase 2 
      1) Add comments 
      2) Do testing 
      3) Fix dashboard top 

*/
