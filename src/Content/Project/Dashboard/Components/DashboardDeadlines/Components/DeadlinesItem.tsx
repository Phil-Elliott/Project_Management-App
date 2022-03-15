import React from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const DeadlinesItem = () => {
  return (
    <div className="dashboard-deadlines-content">
      <div className="deadlines-left">
        <div>
          <p className="deadlines-date">11/23</p>
        </div>
        <p className="deadlines-task">Set project deadline</p>
      </div>
      <div className="deadlines-right">
        <FaPencilAlt className="deadlines-right-icon" />
        <FaTrash className="deadlines-right-icon" />
      </div>
    </div>
  )
}

export default DeadlinesItem
