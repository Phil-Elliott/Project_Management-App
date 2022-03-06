import React from "react"
import { FaAngleDown, FaAngleUp, FaTasks } from "react-icons/fa"

const BottomHeaderContent = ({
  expandProjects,
  expandClass,
  expandContent,
  expandMain,
}: {
  expandProjects: any
  expandClass: any
  expandContent: boolean
  expandMain: boolean
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
      name: "Easy Project",
    },
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
  ]

  return (
    <div className="bottom-header-content">
      <div
        style={expandMain ? { justifyContent: "space-between" } : {}}
        onClick={expandProjects}
        className={expandClass}
      >
        <h2 style={{ padding: "0" }}>Projects</h2>
        {!expandContent ? <FaAngleDown /> : <FaAngleUp />}
      </div>

      {!expandContent
        ? projectLinks.map((icon, i) => {
            if (i < 3) {
              return (
                <div key={i} className={expandClass}>
                  {icon.icon}
                  <h2>{icon.name}</h2>
                </div>
              )
            }
          })
        : projectLinks.map((icon, i) => {
            return (
              <div key={i} className={expandClass}>
                {icon.icon}
                <h2>{icon.name}</h2>
              </div>
            )
          })}
    </div>
  )
}

export default BottomHeaderContent
