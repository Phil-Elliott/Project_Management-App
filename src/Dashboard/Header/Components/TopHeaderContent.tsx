import React from "react"
import { FaPlus, FaRegCircle, FaSignOutAlt } from "react-icons/fa"
import { NavLink } from "react-router-dom"
import { signOut } from "firebase/auth"
import { auth } from "../../../utils/Firebase/Firebase"

const TopHeaderContent = ({
  expandClass,
  expandMain,
  activeTab,
  changeActiveTab,
  displayProjectModal,
}: {
  expandClass: any
  expandMain: boolean
  activeTab: string
  changeActiveTab: any
  displayProjectModal: any
}) => {
  // Links to the top part of the header
  const iconLinks = [
    {
      icon: <FaRegCircle />,
      name: "Projects hub",
      route: "/dashboard/",
    },
    {
      icon: <FaSignOutAlt />,
      name: "Sign out",
      route: "/",
    },
  ]

  const addProject = () => {
    displayProjectModal()
    changeActiveTab("Projects hub")
  }

  return (
    <div className="top-header-content">
      <div className={expandMain ? "logo expand-container" : "logo"}>
        sP<h2>SimplePlan</h2>
      </div>

      <NavLink
        to="/dashboard/"
        style={{
          textDecoration: "none",
          color: "white",
          width: "100%",
        }}
      >
        <div className={expandClass} onClick={() => addProject()}>
          <FaPlus />
          <h2>New project</h2>
        </div>
      </NavLink>

      <NavLink
        to="/dashboard/"
        style={{ textDecoration: "none", color: "white", width: "100%" }}
        className={({ isActive }) =>
          isActive ? `activeTab ${expandClass}` : expandClass
        }
        onClick={() => changeActiveTab("Projects hub")}
      >
        <FaRegCircle />
        <h2>Projects hub</h2>
      </NavLink>

      <NavLink
        to="/"
        style={{ textDecoration: "none", color: "white", width: "100%" }}
        className={({ isActive }) =>
          isActive ? `activeTab ${expandClass}` : expandClass
        }
        onClick={() => signOut(auth)}
      >
        <FaSignOutAlt />
        <h2>Sign out</h2>
      </NavLink>
    </div>
  )
}

export default TopHeaderContent
