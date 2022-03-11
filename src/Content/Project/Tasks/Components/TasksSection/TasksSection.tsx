import React from "react"
import TaskCard from "../TaskCard/TaskCard"
import tasksData from "../../../../../Interfaces"
import { FaPlus } from "react-icons/fa"
import moment from "moment"

const TasksSection = ({
  due,
  tasksData,
  changeDisplay,
}: {
  due: string
  tasksData: Array<tasksData>
  changeDisplay: any
}) => {
  const getTimeDiff = (date: string) => {
    let dueDate = moment(date).format("L")
    let days = moment(dueDate, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  return (
    <div className="tasks-section">
      <p className="tasks-section-heading">{due}</p>
      <button onClick={changeDisplay}>
        <FaPlus className="plus-icon" />
        <p>Add Task</p>
      </button>
      <div className="task-cards">
        {tasksData.map((task, i) => {
          let timeDiff = getTimeDiff(task.date)
          if (timeDiff < 0) {
            if (due === "Late") {
              return <TaskCard key={i} task={task} />
            }
          } else if (timeDiff <= 7) {
            if (due === "This Week") {
              return <TaskCard key={i} task={task} />
            }
          } else if (timeDiff <= 14) {
            if (due === "Next Week") {
              return <TaskCard key={i} task={task} />
            }
          } else if (timeDiff > 14 && due === "Future") {
            return <TaskCard key={i} task={task} />
          }
        })}
      </div>
    </div>
  )
}

export default TasksSection

/*

  first get it to go by late future and then add in 7 days for weeks 
  then find a way to get exact weeks and seeing if that matches 
    maybe look at day of week and then judge off of day count from that 


*/
