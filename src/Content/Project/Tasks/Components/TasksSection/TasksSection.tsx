import React from "react"
import TaskCard from "../TaskCard/TaskCard"
import tasksData from "../../../../../Interfaces"
import { FaPlus } from "react-icons/fa"

const TasksSection = ({
  due,
  tasksData,
  changeDisplay,
}: {
  due: string
  tasksData: Array<tasksData>
  changeDisplay: any
}) => {
  return (
    <div className="tasks-section">
      <p className="tasks-section-heading">{due}</p>
      <button onClick={changeDisplay}>
        <FaPlus className="plus-icon" />
        <p>Add Task</p>
      </button>
      <div className="task-cards">
        {tasksData.map((task, i) => {
          return <TaskCard key={i} task={task} />
        })}
      </div>
    </div>
  )
}

export default TasksSection

/*




*/
