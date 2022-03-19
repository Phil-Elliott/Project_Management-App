import React, { useState, useEffect } from "react"
import TaskCard from "../TaskCard/TaskCard"
import { tasksData } from "../../../../../Interfaces"
import { FaPlus, FaAngleDown } from "react-icons/fa"
import moment from "moment"

const TasksSection = ({
  due,
  tasksData,
  changeDisplay,

  completedTasksData,
}: {
  due: string
  tasksData: Array<tasksData>
  changeDisplay: any

  completedTasksData: Array<tasksData>
}) => {
  const [showAll, setShowAll] = useState<boolean>(false)
  const [showCompleted, setShowCompleted] = useState<boolean>(false)
  const [taskArrByDate, setTaskArrByDate] = useState<Array<tasksData>>([])
  const [completedTaskArrByDate, setCompletedTaskArrByDate] = useState<
    Array<tasksData>
  >([])

  // if (tasksData.length > 1) {
  //   let newTasksData = tasksData.sort((a, b) => {
  //     var dateA: any = new Date(a.date)
  //     var dateB: any = new Date(b.date)
  //     return dateA - dateB
  //   })
  // } else {
  //   let newTasksData = tasksData
  // }
  let newTasksData = tasksData

  // tasksData.length > 2 &&
  //   (newTasksData = tasksData.sort((a, b) => {
  //     var dateA: any = new Date(a.date)
  //     var dateB: any = new Date(b.date)
  //     return dateA - dateB
  //   }))

  /*


  */

  let newCompletedTasksData = completedTasksData

  /*
.sort((a, b) => {
    var dateA: any = new Date(a.date)
    var dateB: any = new Date(b.date)
    return dateA - dateB
  })

  */

  // Finds the difference between due date and current date in days
  const getTimeDiff = (date: string) => {
    let dueDate = moment(date).format("L")
    let days = moment(dueDate, "MM/DD/YYYY").diff(moment().endOf("day"), "days")
    return days
  }

  // used to set the taskArrByDate with the correct tasks for the section
  useEffect(() => {
    let newArr: Array<tasksData> = []
    newTasksData.map((task, i) => {
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
  }, [tasksData.length, tasksData])

  // used to set the taskArrByDate with the correct tasks for the section
  useEffect(() => {
    let newArr: Array<tasksData> = []
    newCompletedTasksData.map((task, i) => {
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

    setCompletedTaskArrByDate(newArr)
  }, [completedTasksData.length, tasksData])

  // Changes the view from three cards to all cards and back to three cards
  const showAllCards = () => {
    setShowAll(!showAll)
  }

  return (
    <div className="tasks-section">
      <p className="tasks-section-heading">{due}</p>
      <button className="tasks-section-heading-button" onClick={changeDisplay}>
        <FaPlus className="plus-icon" />
        <p>Add Task</p>
      </button>
      <div className="task-cards">
        {!showAll
          ? taskArrByDate.map((task, i) => {
              if (i < 3) {
                return <TaskCard key={i} task={task} />
              }
            })
          : taskArrByDate.map((task, i) => {
              return <TaskCard key={i} task={task} />
            })}
      </div>
      <div className="cards-showAll" onClick={showAllCards}>
        <div className="cards-showAll-left">
          <p>Show All</p>
          <p>({taskArrByDate.length})</p>
        </div>
        <FaAngleDown
          className={
            showAll && taskArrByDate.length > 2
              ? "bottom-header-arrow-down-icon"
              : "bottom-header-arrow-up-icon"
          }
        />
      </div>
      <div
        className="cards-showAll"
        onClick={() => setShowCompleted(!showCompleted)}
      >
        <div className="cards-showAll-left">
          <p>Show Completed</p>
          <p>({completedTaskArrByDate.length})</p>
        </div>
        <FaAngleDown
          className={
            showCompleted && completedTaskArrByDate.length
              ? "bottom-header-arrow-down-icon"
              : "bottom-header-arrow-up-icon"
          }
        />
      </div>
      {showCompleted &&
        completedTaskArrByDate.map((task, i) => {
          return <TaskCard key={i} task={task} complete={true} />
        })}
    </div>
  )
}

export default TasksSection

/*

  Organize cards by closest due date

  have the dates line up with the week and nextweek sections 

  make sure all input is put in before adding the card



  first get it to go by late future and then add in 7 days for weeks 
  then find a way to get exact weeks and seeing if that matches 
    maybe look at day of week and then judge off of day count from that 


*/
