import React, { useState, useEffect } from "react"
import "./Tasks.scss"
import TaskSection from "./Components/TasksSection/TasksSection"
import Modal from "./Components/Modal/Modal"
import moment from "moment"

const Tasks = () => {
  const [display, setDisplay] = useState(false)
  const [tasksData, setTasksData] = useState([
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
          />
        )
      })}
      <Modal display={display} changeDisplay={changeDisplay} />
    </div>
  )
}

export default Tasks

/*
  How to find dates within the actual week 


      
    3) Create a modal 
        - Click on + bttn and modal opens 
        - design modal for input 
        - have input alter the array of task by adding one 
        - connect same modal to edit bttn (do this later after creating elipsis options)

    4) Create options
        - show all tasks
            - only show top two or three by date closest
            - then show all when clicked 
            - show origional when clicked again (show less)

        - completed (wait until after next section)
            - show all tasks that have been completed 

    5) Have the elipsis bttn use modal to edit 
        - also allow for delete and finish 
        - need to update array to include finished tasks 

    6) Make the comment bttn open a modal 
      - need to use a diffirent modal for this 
        - copy one online 
          - add comment on top
          - previous comments on bottom 


          can click on card and all details pop up in a modal (save this for another time )





    Have 4 collumns 
      late 
      Next Week 
      Future 
      No dates 
    Have add button on top of each
    Show first three cards in array 
    Have show all button 
    Have show completed button 

    cards
      Name                   three dots(update, delete)
      Department             
      Date due               comments button 
      Assigned person or (not assigned)


      will need a modal for filling out and for comments 



      


<div className="tasks-section">
        <p className="tasks-section-heading">Late</p>
        <button>
          <FaPlus className="plus-icon" />
          <p>Add Task</p>
        </button>
        <div className="task-cards">
          <div className="task-card">
            <div className="task-card-top">
              <p>Set project deadline</p>
              <FaEllipsisH className="task-icon" />
            </div>
            <p className="task-card-department">Marketing</p>
            <div className="task-card-bottom">
              <div className="task-card-bottom-date">
                <FaRegCalendar />
                <p>11/27</p>
              </div>
              <FaRegComment className="task-icon" />
            </div>
            <div className="task-card-assignedTo">
              <FaRegUser />
              <p>John Doe</p>
            </div>
          </div>
        </div>
      </div>
      <div className="tasks-section">
        <p className="tasks-section-heading">This Week</p>
        <button>
          <FaPlus />
          <p>Add Task</p>
        </button>
      </div>
      <div className="tasks-section">
        <p className="tasks-section-heading">Next Week</p>
        <button>
          <FaPlus />
          <p>Add Task</p>
        </button>
      </div>
      <div className="tasks-section">
        <p className="tasks-section-heading">Future</p>
        <button>
          <FaPlus />
          <p>Add Task</p>
        </button>
      </div>

*/
