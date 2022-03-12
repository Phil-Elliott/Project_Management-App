import React from "react"
import { FaAngleDown, FaTasks } from "react-icons/fa"
import { Link } from "react-router-dom"

const BottomHeaderContent = ({
  expandProjects,
  expandClass,
  expandContent,
  expandMain,
  activeTab,
  changeActiveTab,
}: {
  expandProjects: any
  expandClass: any
  expandContent: boolean
  expandMain: boolean
  activeTab: string
  changeActiveTab: any
}) => {
  // Links to the top part of the header
  const projectLinks = [
    {
      icon: <FaTasks />,
      name: "Big project",
    },
    {
      icon: <FaTasks />,
      name: "Medium hub",
    },
    {
      icon: <FaTasks />,
      name: "Easy Project",
    },
    {
      icon: <FaTasks />,
      name: "Big proj",
    },
    {
      icon: <FaTasks />,
      name: "Medium h",
    },
    {
      icon: <FaTasks />,
      name: "Easy P",
    },
    {
      icon: <FaTasks />,
      name: "Eas",
    },
    {
      icon: <FaTasks />,
      name: "Bi",
    },
    {
      icon: <FaTasks />,
      name: "Me",
    },
    {
      icon: <FaTasks />,
      name: "Easy Pro",
    },
  ]

  return (
    <div className="bottom-header-content">
      <div
        style={expandMain ? { justifyContent: "space-between" } : {}}
        onClick={expandProjects}
        className={`${expandClass} bottom-header-arrw-down-container`}
      >
        <h2 style={{ padding: "0" }}>Projects</h2>
        <FaAngleDown
          className={
            expandContent
              ? "bottom-header-arrow-down-icon"
              : "bottom-header-arrow-up-icon"
          }
        />
      </div>
      {!expandContent
        ? projectLinks.map((icon, i) => {
            if (i < 3) {
              return (
                <Link
                  key={icon.name}
                  to="/project"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    width: "100%",
                  }}
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
            }
          })
        : projectLinks.map((icon, i) => {
            return (
              <Link
                key={icon.name}
                to="/project"
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                }}
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

export default BottomHeaderContent
