import React from "react"
import { FaPlus, FaRegCircle } from "react-icons/fa"
import { Link } from "react-router-dom"

const TopHeaderContent = ({
  expandClass,
  expandMain,
  activeTab,
  changeActiveTab,
}: {
  expandClass: any
  expandMain: boolean
  activeTab: string
  changeActiveTab: any
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
    // {
    //   icon: <FaTasks />,
    //   name: "My tasks",
    //   route: "/tasks",
    // },
    // {
    //   icon: <FaUser />,
    //   name: "Account",
    //   route: "/account",
    // },
  ]

  return (
    <div className="top-header-content">
      <div className={expandMain ? "logo expand-container" : "logo"}>
        SP<h2>SimplePlan</h2>
      </div>
      {iconLinks.map((icon, i) => {
        return (
          <Link
            key={icon.name}
            to={icon.route}
            style={{ textDecoration: "none", color: "white", width: "100%" }}
          >
            <div
              className={
                activeTab === icon.name
                  ? `activeTab ${expandClass}`
                  : expandClass
              }
              onClick={() => changeActiveTab(icon.name)}
            >
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
