import React, { useState } from "react"
import "./Tasks.scss"
import TaskSection from "./Components/TasksSection/TasksSection"
import Modal from "./Components/Modal/Modal"

const Tasks = () => {
  const [display, setDisplay] = useState(false)
  const [taskData, setTaskData] = useState([
    {
      due: "Late",
      tasks: [
        {
          name: "Set project deadline",
          department: "Marketing",
          date: "11/27",
          assigned: "John Doe",
          comments: [
            {
              name: "Brian",
              date: "11/18",
              comment: "Blah Blah Blah",
            },
          ],
        },
      ],
    },
    {
      due: "This Week",
      tasks: [
        {
          name: "Add something",
          department: "Devops",
          date: "11/11",
          assigned: "MArk Doe",
          comments: [
            {
              name: "Brian",
              date: "11/18",
              comment: "Blah Blah Blah",
            },
          ],
        },
      ],
    },
    {
      due: "Next Week",
      tasks: [
        {
          name: "Delete everything",
          department: "Events",
          date: "11/7",
          assigned: "Bob Doe",
          comments: [
            {
              name: "Brian",
              date: "11/18",
              comment: "Blah Blah Blah",
            },
          ],
        },
      ],
    },
    {
      due: "Future",
      tasks: [
        {
          name: "Finish deadline",
          department: "Marketing",
          date: "12/11",
          assigned: "Marsha Doe",
          comments: [
            {
              name: "Brian",
              date: "11/18",
              comment: "Blah Blah Blah",
            },
          ],
        },
      ],
    },
  ])

  // displays the modal
  const changeDisplay = () => {
    setDisplay(!display)
  }

  // Adds task to taskData
  // const addTask = (id, answer) => {
  //   badgeDetailsArr[id].answer = answer
  // }

  return (
    <div className="tasks-main-container">
      {taskData.map((section, i) => {
        return (
          <TaskSection
            key={i}
            due={section.due}
            tasksData={section.tasks}
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
  Needs to find correct part of array based off of date 
    could do a switch statement 
    might have to format the date and compare to today's date 

    maybe wait for the entire object to finish and then send it over from the modal page and have a object sent to the task page 

    console.log(the date area to make sure that part works)
    then try to push to array 

    still need to organize based off of the current date 

    maybe dont have tasks under a specific date 
    filter through each one to find the dates in the right area 
    add tasks willy nilly 


      
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
