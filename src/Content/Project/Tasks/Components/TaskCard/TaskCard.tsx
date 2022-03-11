import React from "react"
import "./TaskCard.scss"
import tasksData from "../../../../../Interfaces"
import {
  FaRegComment,
  FaEllipsisH,
  FaRegCalendar,
  FaRegUser,
} from "react-icons/fa"

const TaskCard = ({ task }: { task: tasksData }) => {
  return (
    <div className="task-card">
      <div className="task-card-top">
        <p>{task.name}</p>
        <FaEllipsisH className="task-icon" />
      </div>
      <p className="task-card-department">{task.department}</p>
      <div className="task-card-bottom">
        <div className="task-card-bottom-date">
          <FaRegCalendar />
          <p>{task.date}</p>
        </div>
        <FaRegComment className="task-icon" />
      </div>
      <div className="task-card-assignedTo">
        <FaRegUser />
        <p>{task.assigned}</p>
      </div>
    </div>
  )
}

export default TaskCard
