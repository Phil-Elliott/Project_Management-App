import React, { useState } from "react"
import "./Nav.scss"
import {
  FaAngleDown,
  FaAngleUp,
  FaTh,
  FaClipboard,
  FaUsers,
  FaCalendar,
  FaTasks,
  FaCoins,
} from "react-icons/fa"
import { Link } from "react-router-dom"

const Nav = () => {
  const [active, setActive] = useState<string>("Board")
  const [activeNav, setActiveNav] = useState<boolean>(false)

  const navLinksArr = [
    {
      logo: <FaTh />,
      name: "Board",
      route: "/project",
    },
    {
      logo: <FaClipboard />,
      name: "Details",
      route: "/project/details",
    },
    {
      logo: <FaUsers />,
      name: "Team",
      route: "/project/team",
    },
    {
      logo: <FaCalendar />,
      name: "Schedule",
      route: "/project/time",
    },
    {
      logo: <FaTasks />,
      name: "Tasks",
      route: "/project/tasks",
    },
    {
      logo: <FaCoins />,
      name: "Finance",
      route: "/project/finance",
    },
  ]

  return (
    <div className="mian-nav-container">
      <div className="nav-name-container">
        <div className="nav-logo">
          <p>PN</p>
        </div>
        <p className="project-name">Project Name</p>
        <div className="project-links-arrow">
          <FaAngleDown onClick={() => setActiveNav(!activeNav)} />
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
