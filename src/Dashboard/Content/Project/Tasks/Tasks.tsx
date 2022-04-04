import React, { useState, useEffect } from "react"
import "./Tasks.scss"
import TaskSection from "./Components/TasksSection/TasksSection"
import Modal from "./Components/Modal/Modal"
import { RootState } from "../../../Store"
import { useSelector } from "react-redux"

const Tasks = () => {
  const [display, setDisplay] = useState(false)

  const projectsData = useSelector(
    (state: RootState) => state.projectsData.activeProject
  )

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
            tasksData={projectsData.tasks}
            changeDisplay={changeDisplay}
            completedTasksData={projectsData.completed}
          />
        )
      })}
      <Modal display={display} changeDisplay={changeDisplay} />
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
