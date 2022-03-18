import React, { useState } from "react"
import "./Nav.scss"
import { FaAngleDown, FaTh, FaTasks } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import { projectData } from "../../../Interfaces"

const Nav = ({ projectsData }: { projectsData: projectData }) => {
  const [activeNav, setActiveNav] = useState<boolean>(false)

  const navLinksArr = [
    {
      logo: <FaTh />,
      name: "Board",
      route: "/project/board",
    },
    {
      logo: <FaTasks />,
      name: "Tasks",
      route: "/project/tasks",
    },
  ]

  return (
    <div className="mian-nav-container">
      <div className="nav-name-container">
        <div
          className="nav-logo"
          style={{ backgroundColor: projectsData.color }}
        >
          <p>{projectsData.initials}</p>
        </div>
        <p className="project-name">{projectsData.name}</p>
        <div className="project-links-arrow">
          <FaAngleDown
            onClick={() => setActiveNav(!activeNav)}
            className={activeNav ? "arrow-logo-down" : "arrow-logo-up"}
          />
        </div>
      </div>
      <div
        className={
          activeNav === false
            ? "nav-links-container nav-links-unactive"
            : "nav-links-container nav-links-active"
        }
      >
        {navLinksArr.map((link, i) => {
          return (
            <NavLink
              key={link.name}
              to={link.route}
              style={{
                textDecoration: "none",
              }}
              className={({ isActive }) =>
                isActive ? "active-link nav-link" : "nav-link"
              }
            >
              {link.logo}
              <p>{link.name}</p>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Nav
