import React, { useState, useEffect } from "react"
import "./../../Modal/Modal.scss"
import ModalInput from "../../Modal/ModalInput"

const EditModal = ({
  displayEditModal,
  changeEditDisplay,
  addTask,
  task,
  deleteTask,
}: {
  displayEditModal: boolean
  changeEditDisplay: any
  addTask: any
  task: any
  deleteTask: any
}) => {
  // Allows ESC key to only be used to close
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      changeEditDisplay()
    }
  }

  // Allows for enter key to save details
  const saveOnEnterKeyDown = (e: any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
    }
  }

  // Allows access to use keys only when modal is displayed
  useEffect(() => {
    if (displayEditModal === true) {
      document.body.addEventListener("keydown", closeOnEscapeKeyDown)
      document.body.addEventListener("keydown", saveOnEnterKeyDown)
    }
  }, [displayEditModal])

  const objectData = {
    name: task.name,
    department: task.department,
    date: task.date,
    assigned: task.assigned,
    comments: [
      {
        name: "",
        date: "",
        comment: "",
      },
    ],
  }

  const changeCard = () => {
    addTask(objectData)
    deleteTask(task.name)
    changeEditDisplay()
  }

  const changeObjectData = (part: any, input: string) => {
    if (part === "name") {
      objectData.name = input
    } else if (part === "department") {
      objectData.department = input
    } else if (part === "date") {
      objectData.date = input
    } else if (part === "assigned") {
      objectData.assigned = input
    }
  }

  // Array for input questions
  const inputQuestions = [
    {
      question: "Task",
      type: "text",
      part: "name",
      value: task.name,
    },
    {
      question: "Department",
      type: "text",
      part: "department",
      value: task.department,
    },
    {
      question: "Date",
      type: "date",
      part: "date",
      value: task.date,
    },
    {
      question: "Assigned to",
      type: "text",
      part: "assigned",
      value: task.assigned,
    },
  ]

  return (
    <div
      className={`modal ${displayEditModal ? "show" : ""}`}
      onClick={changeEditDisplay}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">Edit Task</h1>
        </div>
        <div className="modal-body">
          {inputQuestions.map((item, i) => {
            return (
              <ModalInput
                key={i}
                question={item.question}
                type={item.type}
                part={item.part}
                value={item.value}
                display={displayEditModal}
                changeObjectData={changeObjectData}
              />
            )
          })}
        </div>
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={changeEditDisplay}>
            Close
          </button>
          <button
            className="modal-create-btn"
            type="submit"
            onClick={() => changeCard()}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  )
}

export default EditModal

/*
    - need to get original values put into it 
    - fix the bttns (must be some div style i put in before)

    
      
      could put value in input question 
      pass as a prop 
      fill the value or even input to = that from the getco 



    next make sure there is input 

      

*/
