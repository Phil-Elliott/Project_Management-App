import React, { useState, useEffect } from "react"
import TaskCard from "../TaskCard/TaskCard"
import tasksData from "../../../../../Interfaces"
import { FaPlus, FaAngleDown } from "react-icons/fa"
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
  const [showAll, setShowAll] = useState<boolean>(false)
  const [taskArrByDate, setTaskArrByDate] = useState<Array<tasksData>>([])

  // Finds the difference between due date and current date in days
  const getTimeDiff = (date: string) => {
    let dueDate = moment(date).format("L")
    let days = moment(dueDate, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  useEffect(() => {
    let newArr: Array<tasksData> = []
    tasksData.map((task, i) => {
      let timeDiff = getTimeDiff(task.date)
      if (timeDiff < 0) {
        if (due === "Late") {
          return newArr.push(task)
        }
      } else if (timeDiff <= 7) {
        if (due === "This Week") {
          return newArr.push(task)
        }
      } else if (timeDiff <= 14) {
        if (due === "Next Week") {
          return newArr.push(task)
        }
      } else if (timeDiff > 14 && due === "Future") {
        return newArr.push(task)
      }
    })
    setTaskArrByDate(newArr)
  }, [tasksData.length])

  const showAllCards = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="tasks-section">
      <p className="tasks-section-heading">{due}</p>
      <button onClick={changeDisplay}>
        <FaPlus className="plus-icon" />
        <p>Add Task</p>
      </button>
      <div className="task-cards">
        {taskArrByDate.map((task, i) => {
          return <TaskCard key={i} task={task} />
        })}
      </div>
      <div className="cards-showAll">
        <div className="cards-showAll-left">
          <p>Show All</p>
        </div>
        <FaAngleDown onClick={showAllCards} />
      </div>
      <div className="cards-showAll">
        <div className="cards-showAll-left">
          <p>Show Completed</p>
        </div>
        <FaAngleDown onClick={showAllCards} />
      </div>
    </div>
  )
}

export default TasksSection

/*
    





  show all 
    can have a filter if unactive 
    no filter if active 



  first get it to go by late future and then add in 7 days for weeks 
  then find a way to get exact weeks and seeing if that matches 
    maybe look at day of week and then judge off of day count from that 





    

*/
