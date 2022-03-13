import React, { useState, useEffect } from "react"
import "./Tasks.scss"
import TaskSection from "./Components/TasksSection/TasksSection"
import Modal from "./Components/Modal/Modal"

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

  // Adds a task to the taskData array from Modal
  const addTask = (task: any) => {
    let newArr = tasksData
    newArr.push(task)
    setTasksData(newArr)
    changeDisplay()
  }

  // Deletes a task from the taskData array - from taskCard component
  const deleteTask = (name: string) => {
    setTasksData(
      tasksData.filter((task) => {
        return task.name !== name
      })
    )
  }

  // Edits a task from the taskData array
  const editCard = (name: string) => {}

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

    



      can probobly do show all
        useEffect 
          run the if statements and then splits the tasks into sections before running in map 
*/

/*
come back to 
  How to find dates within the actual week 


      
    3) Create a modal 
        - connect same modal to edit bttn (do this later after creating elipsis options)

        show all (number)                    down arrow 
        show completed (number)              down arrow


        arrows turn up when active 


        make sure that the arrow origional filters out first three 

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



      




*/
