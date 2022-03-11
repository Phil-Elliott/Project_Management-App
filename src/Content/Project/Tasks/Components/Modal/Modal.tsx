import React, { useState, useEffect } from "react"
import "./Modal.scss"
import ModalInput from "./ModalInput"

// closes modal with ESC key
const Modal = ({
  display,
  changeDisplay,
}: {
  display: boolean
  changeDisplay: any
}) => {
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
    },
    {
      question: "Department",
      type: "text",
    },
    {
      question: "Date",
      type: "date",
    },
    {
      question: "Assigned to",
      type: "text",
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
                display={display}
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
            onClick={changeDisplay}
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

 1) Have input work 

*/
