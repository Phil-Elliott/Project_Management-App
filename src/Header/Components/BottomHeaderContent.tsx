import React from "react"
import { FaAngleDown, FaTasks } from "react-icons/fa"
import { Link } from "react-router-dom"
import { projectData } from "../../Interfaces"

const BottomHeaderContent = ({
  expandProjects,
  expandClass,
  expandContent,
  expandMain,
  activeTab,
  changeActiveTab,
  projectsData,
}: {
  expandProjects: any
  expandClass: any
  expandContent: boolean
  expandMain: boolean
  activeTab: string
  changeActiveTab: any
  projectsData: Array<projectData>
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
        ? projectsData.map((project, i) => {
            if (i < 3) {
              return (
                <Link
                  key={project.name}
                  to="/project"
                  style={{
                    textDecoration: "none",
                    color: "white",
                    width: "100%",
                  }}
                >
                  <div
                    className={
                      activeTab === project.name
                        ? `activeTab ${expandClass}`
                        : expandClass
                    }
                    onClick={() => changeActiveTab(project.name)}
                  >
                    <div
                      className="bottom-header-logo"
                      style={{ background: project.color }}
                    >
                      <p>{project.initials}</p>
                    </div>
                    <h2>{project.name}</h2>
                  </div>
                </Link>
              )
            }
          })
        : projectsData.map((project, i) => {
            return (
              <Link
                key={project.name}
                to="/project"
                style={{
                  textDecoration: "none",
                  color: "white",
                  width: "100%",
                }}
              >
                <div
                  className={
                    activeTab === project.name
                      ? `activeTab ${expandClass}`
                      : expandClass
                  }
                  onClick={() => changeActiveTab(project.name)}
                >
                  <div
                    className="bottom-header-logo"
                    style={{ background: project.color }}
                  >
                    <p>{project.initials}</p>
                  </div>
                  <h2>{project.name}</h2>
                </div>
              </Link>
            )
          })}
    </div>
  )
}

export default BottomHeaderContent
