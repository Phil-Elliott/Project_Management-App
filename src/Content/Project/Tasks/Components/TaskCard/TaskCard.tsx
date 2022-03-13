import React, { useState } from "react"
import "./TaskCard.scss"
import tasksData from "../../../../../Interfaces"
import {
  FaRegComment,
  FaEllipsisH,
  FaRegCalendar,
  FaRegUser,
} from "react-icons/fa"

const TaskCard = ({
  task,
  deleteTask,
}: {
  task: tasksData
  deleteTask: any
}) => {
  const [dropDownActive, setDropDownActive] = useState<boolean>(false)

  const deleteCard = () => {
    setDropDownActive(false)
    deleteTask(task.name)
  }

  return (
    <div className="task-card">
      <div
        className={
          dropDownActive ? "ellipsisDropDown" : "ellipsisDropDownUnActive"
        }
      >
        <p>Edit</p>
        <p onClick={() => deleteCard()}>Delete</p>
        <p style={{ border: "none" }}>Finished</p>
      </div>
      <div className="task-card-top">
        <p>{task.name}</p>
        <FaEllipsisH
          className="task-icon"
          onClick={() => setDropDownActive(!dropDownActive)}
        />
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

/*
    


*/
