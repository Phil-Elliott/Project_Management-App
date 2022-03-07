import React from "react"
import { FaPlus, FaRegCircle, FaUser, FaTasks } from "react-icons/fa"
import { Link } from "react-router-dom"

const TopHeaderContent = ({
  expandClass,
  expandMain,
}: {
  expandClass: any
  expandMain: boolean
}) => {
  // Links to the top part of the header
  const iconLinks = [
    {
      icon: <FaPlus />,
      name: "New project",
      route: "/new",
    },
    {
      icon: <FaRegCircle />,
      name: "Projects hub",
      route: "/",
    },
    {
      icon: <FaTasks />,
      name: "My tasks",
      route: "/tasks",
    },
    {
      icon: <FaUser />,
      name: "Account",
      route: "/account",
    },
  ]

  return (
    <div className="top-header-content">
      <div className={expandMain ? "logo expand-container" : "logo"}>
        SP<h2>Simple Plan</h2>
      </div>
      {iconLinks.map((icon, i) => {
        return (
          <Link
            to={icon.route}
            style={{ textDecoration: "none", color: "white", width: "100%" }}
          >
            <div key={i} className={expandClass}>
              {icon.icon}
              <h2>{icon.name}</h2>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export default TopHeaderContent
