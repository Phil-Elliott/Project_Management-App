import React from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const DeadlinesItem = ({ name, date }: { name?: string; date?: string }) => {
  return (
    <div className="dashboard-deadlines-content">
      <div className="deadlines-left">
        <div>
          <p className="deadlines-date">{date ? date : ""}</p>
        </div>
        <p className="deadlines-task">{name ? name : ""}</p>
      </div>
      {name && (
        <div className="deadlines-right">
          <FaPencilAlt className="deadlines-right-icon" />
          <FaTrash className="deadlines-right-icon" />
        </div>
      )}
    </div>
  )
}

export default DeadlinesItem
