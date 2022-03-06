import React from "react"
import { FaPlus, FaRegCircle, FaUser } from "react-icons/fa"

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
    },
    {
      icon: <FaRegCircle />,
      name: "Projects hub",
    },
    {
      icon: <FaUser />,
      name: "My tasks",
    },
  ]

  return (
    <div className="top-header-content">
      <div className={expandMain ? "logo expand-container" : "logo"}>
        SP<h2>Simple Plan</h2>
      </div>
      {iconLinks.map((icon, i) => {
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

export default TopHeaderContent
