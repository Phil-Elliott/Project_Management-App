import React, { useState } from "react"
import EditModal from "./Components/EditModal"
import CommentModal from "./Components/CommentModal"
import "./TaskCard.scss"
import { tasksData } from "../../../../../Interfaces"
import {
  FaRegComment,
  FaComment,
  FaRegCalendar,
  FaRegUser,
  FaCheckCircle,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa"
import {
  deleteTask,
  deleteComlpletedTask,
  completeTask,
} from "../../../../../ProjectDataSlice"
import { useDispatch } from "react-redux"

const TaskCard = ({ task, complete }: { task: tasksData; complete?: any }) => {
  const [displayEditModal, setDisplayEditModal] = useState(false)
  const [displayCommentModal, setDisplayCommentModal] = useState(false)

  const dispatch = useDispatch()

  const deleteCard = () => {
    dispatch(deleteTask(task.name))
  }

  // displays the edit modal
  const changeEditDisplay = () => {
    setDisplayEditModal(!displayEditModal)
  }

  // displays the comment modal
  const changeCommentDisplay = () => {
    setDisplayCommentModal(!displayCommentModal)
  }

  return (
    <div className="task-card">
      <EditModal
        displayEditModal={displayEditModal}
        changeEditDisplay={changeEditDisplay}
        task={task}
      />
      <CommentModal
        displayCommentModal={displayCommentModal}
        changeCommentDisplay={changeCommentDisplay}
        task={task}
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
              onClick={() => dispatch(deleteComlpletedTask(task.name))}
              className="task-card-top-icon-right"
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
        {/* <FaRegComment
          className="task-icon"
          onClick={() => changeCommentDisplay()}
        /> */}
        {task.comments.length ? (
          <FaComment
            className="task-icon"
            onClick={() => changeCommentDisplay()}
          />
        ) : (
          <FaRegComment
            className="task-icon"
            onClick={() => changeCommentDisplay()}
          />
        )}
      </div>
      <div className="asignedTo-container">
        <div className="task-card-assignedTo">
          <FaRegUser />
          <p>{task.assigned}</p>
        </div>
        {!complete ? (
          <FaCheckCircle
            className="check-icon"
            onClick={() =>
              dispatch(
                completeTask({
                  taskObj: task,
                  name: task.name,
                  complete: false,
                })
              )
            }
          />
        ) : (
          <FaCheckCircle
            className="active-check-icon"
            onClick={() =>
              dispatch(
                completeTask({
                  taskObj: task,
                  name: task.name,
                  complete: true,
                })
              )
            }
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
