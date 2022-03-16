import React, { useState } from "react"
import EditModal from "./Components/EditModal"
import "./TaskCard.scss"
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { tasksData } from "../../../../../Interfaces"
import {
  FaRegComment,
  FaRegCalendar,
  FaRegUser,
  FaCheckCircle,
} from "react-icons/fa"

const TaskCard = ({
  task,
  deleteTask,
  addTask,
  completeTask,
  complete,
  deleteComlpletedTask,
}: {
  task: tasksData
  deleteTask: any
  addTask: any
  completeTask: any
  complete?: any
  deleteComlpletedTask?: any
}) => {
  const [displayEditModal, setDisplayEditModal] = useState(false)

  const deleteCard = () => {
    deleteTask(task.name)
  }

  // displays the modal
  const changeEditDisplay = () => {
    setDisplayEditModal(!displayEditModal)
  }

  return (
    <div className="task-card">
      <EditModal
        displayEditModal={displayEditModal}
        changeEditDisplay={changeEditDisplay}
        addTask={addTask}
        task={task}
        deleteTask={deleteTask}
      />

      <div className="task-card-top">
        <p>{task.name}</p>
        {!complete ? (
          <div>
            <FaPencilAlt
              onClick={() => changeEditDisplay()}
              className="task-card-top-icon-left"
            />
            <FaTrash
              onClick={() => deleteCard()}
              className="task-card-top-icon-right"
            />
          </div>
        ) : (
          <div>
            <FaTrash
              onClick={() => deleteComlpletedTask(task.name)}
              className="task-card-top-icon"
            />
          </div>
        )}
      </div>
      <p className="task-card-department">{task.department}</p>
      <div className="task-card-bottom">
        <div className="task-card-bottom-date">
          <FaRegCalendar />
          <p>{task.date}</p>
        </div>
        {/* <FaRegComment className="task-icon" /> */}
      </div>
      <div className="asignedTo-container">
        <div className="task-card-assignedTo">
          <FaRegUser />
          <p>{task.assigned}</p>
        </div>
        {!complete ? (
          <FaCheckCircle
            className="check-icon"
            onClick={() => completeTask(task, task.name, false)}
          />
        ) : (
          <FaCheckCircle
            className="active-check-icon"
            onClick={() => completeTask(task, task.name, true)}
          />
        )}
      </div>
    </div>
  )
}

export default TaskCard

/*
    - Have a function on main page

      - filter and find the one clicked 
          - use filter and name 
      - move this into new section called completed 
      - have it deleted from old array 

      Use a diffirent function and click for completed ones 


*/
