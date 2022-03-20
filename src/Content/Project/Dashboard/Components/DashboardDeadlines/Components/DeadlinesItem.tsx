import React from "react"
import { FaPencilAlt, FaTrash, FaCheckCircle } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { deleteTask, completeTask } from "../../../../../../ProjectDataSlice"

const DeadlinesItem = ({
  date,
  name,
  task,
}: {
  date?: string
  name?: string
  task?: any
}) => {
  const dispatch = useDispatch()

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
          <FaCheckCircle
            className="deadlines-right-icon deadlines-right-icon-check"
            onClick={() =>
              dispatch(
                completeTask({
                  taskObj: task,
                  name: name,
                  complete: false,
                })
              )
            }
          />
          {/* <FaPencilAlt className="deadlines-right-icon deadlines-right-icon-edit" /> */}
          <FaTrash
            className="deadlines-right-icon deadlines-right-icon-trash"
            onClick={() => dispatch(deleteTask(task.name))}
          />
        </div>
      )}
    </div>
  )
}

export default DeadlinesItem
