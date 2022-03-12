import React, { useState, useEffect } from "react"
import "./Modal.scss"
import ModalInput from "./ModalInput"

// closes modal with ESC key
const Modal = ({
  display,
  changeDisplay,
  addTask,
}: {
  display: boolean
  changeDisplay: any
  addTask: any
}) => {
  const objectData = {
    name: "",
    department: "",
    date: "",
    assigned: "",
    comments: [
      {
        name: "",
        date: "",
        comment: "",
      },
    ],
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

  // Allows ESC key to only be used to close
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      changeDisplay()
    }
  }

  // Allows for enter key to save details
  const saveOnEnterKeyDown = (e: any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      // saveChanges()
    }
  }

  // Allows access to use keys only when modal is displayed
  useEffect(() => {
    if (display === true) {
      document.body.addEventListener("keydown", closeOnEscapeKeyDown)
      document.body.addEventListener("keydown", saveOnEnterKeyDown)
    }
  }, [display])

  // Array for input questions
  const inputQuestions = [
    {
      question: "Task",
      type: "text",
      part: "name",
    },
    {
      question: "Department",
      type: "text",
      part: "department",
    },
    {
      question: "Date",
      type: "date",
      part: "date",
    },
    {
      question: "Assigned to",
      type: "text",
      part: "assigned",
    },
  ]

  return (
    <div className={`modal ${display ? "show" : ""}`} onClick={changeDisplay}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">Add Task</h1>
        </div>
        <div className="modal-body">
          {inputQuestions.map((item, i) => {
            return (
              <ModalInput
                key={i}
                question={item.question}
                type={item.type}
                part={item.part}
                display={display}
                changeObjectData={changeObjectData}
              />
            )
          })}
        </div>
        <div className="modal-footer">
          <button className="modal-close-btn" onClick={changeDisplay}>
            Close
          </button>
          <button
            className="modal-create-btn"
            type="submit"
            onClick={() => addTask(objectData)}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal

/*

      - state for object 
      - set part of that object when the input data changes
      - pass the object to the function on create click 
      - set everything to blank 

*/
