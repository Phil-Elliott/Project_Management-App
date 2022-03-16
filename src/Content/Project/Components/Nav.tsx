import React, { useState } from "react"
import "./Nav.scss"
import {
  FaAngleDown,
  FaTh,
  FaClipboard,
  FaUsers,
  FaCalendar,
  FaTasks,
  FaCoins,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import { projectData } from "../../../Interfaces"

const Nav = ({ projectsData }: { projectsData: projectData }) => {
  const [active, setActive] = useState<string>("Board")
  const [activeNav, setActiveNav] = useState<boolean>(false)

  const navLinksArr = [
    {
      logo: <FaTh />,
      name: "Board",
      route: "/project",
    },
    // {
    //   logo: <FaClipboard />,
    //   name: "Details",
    //   route: "/project/details",
    // },
    // {
    //   logo: <FaUsers />,
    //   name: "Team",
    //   route: "/project/team",
    // },
    // {
    //   logo: <FaCalendar />,
    //   name: "Schedule",
    //   route: "/project/time",
    // },
    {
      logo: <FaTasks />,
      name: "Tasks",
      route: "/project/tasks",
    },
    // {
    //   logo: <FaCoins />,
    //   name: "Finance",
    //   route: "/project/finance",
    // },
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
            <Link
              key={link.name}
              to={link.route}
              style={{
                textDecoration: "none",
              }}
            >
              <div
                className={
                  active === link.name ? "nav-link active-link" : "nav-link "
                }
                onClick={() => setActive(link.name)}
              >
                {link.logo}
                <p>{link.name}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Nav
