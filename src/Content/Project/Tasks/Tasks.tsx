import React, { useState, useEffect } from "react"
import "./Tasks.scss"
import TaskSection from "./Components/TasksSection/TasksSection"
import Modal from "./Components/Modal/Modal"
import tasksData from "../../../Interfaces"

const Tasks = () => {
  const [display, setDisplay] = useState(false)
  const [tasksData, setTasksData] = useState<Array<tasksData>>([
    {
      name: "Set project deadline",
      department: "Marketing",
      date: "2022-03-01",
      assigned: "John Doe",
      comments: [
        {
          name: "Brian",
          date: "11/18",
          comment: "Blah Blah Blah",
        },
      ],
    },
    {
      name: "Add something",
      department: "Devops",
      date: "2022-03-19",
      assigned: "MArk Doe",
      comments: [
        {
          name: "Brian",
          date: "11/18",
          comment: "Blah Blah Blah",
        },
      ],
    },
    {
      name: "Delete everything",
      department: "Events",
      date: "2022-03-16",
      assigned: "Bob Doe",
      comments: [
        {
          name: "Brian",
          date: "11/18",
          comment: "Blah Blah Blah",
        },
      ],
    },
    {
      name: "Finish deadline",
      department: "Marketing",
      date: "2022-04-25",
      assigned: "Marsha Doe",
      comments: [
        {
          name: "Brian",
          date: "12/18",
          comment: "Blah Blah Blah",
        },
      ],
    },
  ])
  const [completedTasksData, setCompletedTasksData] = useState<
    Array<tasksData>
  >([])

  // Adds a task to the taskData array from Modal
  const addTask = (task: any) => {
    let newArr = tasksData
    newArr.push(task)
    setTasksData(newArr)
    setDisplay(false)
  }

  // Deletes a task from the taskData array - from taskCard component
  const deleteTask = (name: string) => {
    setTasksData(
      tasksData.filter((task) => {
        return task.name !== name
      })
    )
  }

  // Deletes a task from the completed tasks data array
  const deleteComlpletedTask = (name: string) => {
    setCompletedTasksData(
      completedTasksData.filter((task) => {
        return task.name !== name
      })
    )
  }

  // Moves a task to the completed array
  const completeTask = (task: any, name: string, complete: boolean) => {
    if (!complete) {
      let newTasks = completedTasksData
      newTasks.push(task)
      setCompletedTasksData(newTasks)
      deleteTask(name)
    } else {
      let newArr = tasksData
      newArr.push(task)
      setTasksData(newArr)
      deleteComlpletedTask(name)
    }
  }

  // Sections of the page
  const taskTime = ["Late", "This Week", "Next Week", "Future"]

  // displays the modal
  const changeDisplay = () => {
    setDisplay(!display)
  }

  return (
    <div className="tasks-main-container">
      {taskTime.map((time, i) => {
        return (
          <TaskSection
            key={i}
            due={time}
            tasksData={tasksData}
            changeDisplay={changeDisplay}
            deleteTask={deleteTask}
            addTask={addTask}
            completeTask={completeTask}
            completedTasksData={completedTasksData}
            deleteComlpletedTask={deleteComlpletedTask}
          />
        )
      })}
      <Modal
        display={display}
        changeDisplay={changeDisplay}
        addTask={addTask}
      />
    </div>
  )
}

export default Tasks

/*  

  come back to 
      1) make a modal that for the delete bttn (just ask if they are sure)
      2) How to find dates within the actual week
      3) Need to make all inputs mandatory 
    
  need to do 
      1) Have ability to edit the card 
      2) Create comment section (modal can see comments and make comments)
      3) Add ability to finish the task 
          figure out how to do that in the array 
          have them shown on the completed tab only when clicked 



    Just make a separate modal for now (can fix this later)
    edit the card 
      need to have a modal popup on click 
      values should come from card details 
      maybe find a way to use other modal 
      have a function that it runs back to

      option 1
        locate card to be edited 
          use filter with name 
            can pass back the card name 
            can also pass back a new input with all of the data (simalar to other modal)
                might have a problem with comments section 
            filter out old and push in new on submit bttn 

    


*/
