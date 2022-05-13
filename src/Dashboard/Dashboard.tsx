import React, { useState, useEffect } from "react"
import "./Dashboard.scss"
import ResponsiveHeader from "./ResponsiveHeader/ResponsiveHeader"
import Header from "./Header/Header"
import Content from "./Content/Content"
import { projectData } from "./Interfaces"
import { RootState } from "./Store"
import { useSelector, useDispatch } from "react-redux"
import {
  addDataOnRender,
  addNewProject,
  editProject,
  deleteProject,
  changeActiveProject,
  updateProjectData,
} from "./ProjectDataSlice"
import { doc, getDoc, collection, updateDoc } from "firebase/firestore"
import { db, auth } from "../utils/Firebase/Firebase"

const Dashboard = () => {
  const [navClass, setNavClass] = useState("header unactive-side-nav")
  const [activeTab, setActiveTab] = useState<string>("")
  const [displayAddProjectModal, setDisplayAddProjectModal] =
    useState<boolean>(false)
  const [displayEditProjectModal, setDisplayEditProjectModal] =
    useState<boolean>(false)

  const activeProject = useSelector(
    (state: RootState) => state.projectsData.activeProject
  )
  const projects = useSelector(
    (state: RootState) => state.projectsData.projects.projects
  )
  const dispatch = useDispatch()

  // Firebase

  const currentUser = auth.currentUser
  let uid = "test"
  if (currentUser) {
    uid = currentUser.uid
  }

  useEffect(() => {
    const getData = async () => {
      const docRef = doc(db, "users", uid)
      const docSnap = await getDoc(docRef)
      const data = docSnap.data()
      if (data) {
        dispatch(addDataOnRender(data.projects))
      }
    }
    getData()
  }, [])

  useEffect(() => {
    const updateData = async () => {
      const userRef = doc(db, "users", uid)
      await updateDoc(userRef, {
        projects: projects,
      })
    }
    if (projects.length) {
      updateData()
    }
  }, [projects])

  // Adds a project to the projectsData array from addProjectModal
  const addProject = (project: projectData) => {
    dispatch(addNewProject(project))
    displayProjectModal()
  }

  // Edits a project to the projectsData array from editProjectModal
  const editTheProject = (project: projectData, name: string) => {
    dispatch(editProject({ project, name }))
    changeDisplayEditProjectModal()
  }

  // Deletes a project from the projectsData array
  const deleteTheProject = (name: string) => {
    dispatch(deleteProject(name))
    changeDisplayEditProjectModal()
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
  const changeDisplayEditProjectModal = () => {
    setDisplayEditProjectModal(!displayEditProjectModal)
  }

  return (
    <div className="Dashboard">
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
        displayEditProjectModal={displayEditProjectModal}
        changeDisplayEditProjectModal={changeDisplayEditProjectModal}
        addProject={addProject}
        editProject={editTheProject}
        deleteProject={deleteTheProject}
        changeActiveTab={changeActiveTab}
      />
    </div>
  )
}

export default Dashboard

/*
  1) Could probably use local storage to help with refreshing the page
  2) Maybe you need to get rid of data on signout 
  

*/
