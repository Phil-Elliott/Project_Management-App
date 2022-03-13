import React, { useState } from "react"
import EditModal from "./Components/EditModal"
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
  addTask,
}: {
  task: tasksData
  deleteTask: any
  addTask: any
}) => {
  const [dropDownActive, setDropDownActive] = useState<boolean>(false)
  const [displayEditModal, setDisplayEditModal] = useState(false)

  const deleteCard = () => {
    setDropDownActive(false)
    deleteTask(task.name)
  }

  // displays the modal
  const changeEditDisplay = () => {
    setDisplayEditModal(!displayEditModal)
    setDropDownActive(false)
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
      <div
        className={
          dropDownActive ? "ellipsisDropDown" : "ellipsisDropDownUnActive"
        }
      >
        <p onClick={() => changeEditDisplay()}>Edit</p>
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
    edit 
      edit bttn clicked 
      modal come up with edit details 
        copy a lot of the other one 
      modal edit bttn clicked
        function is kicked off
          sends new object back 
          resets all inputs 
      function is kicked off on tasks main page 
        needs the origioal task name 
        removes that 
        pushs in the new one 


*/
