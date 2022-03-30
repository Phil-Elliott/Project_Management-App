import React, { useState, useEffect } from "react"
import "./CommentModal.scss"
import { FaRegUser } from "react-icons/fa"
import { tasksData } from "../../../../../../Interfaces"
import { useDispatch } from "react-redux"
import { addComment } from "../../../../../../ProjectDataSlice"
import { commentsData } from "../../../../../../Interfaces"
import moment from "moment"

const CommentModal = ({
  displayCommentModal,
  changeCommentDisplay,
  task,
}: {
  displayCommentModal: boolean
  changeCommentDisplay: any
  task: tasksData
}) => {
  const [comment, setComment] = useState<commentsData>({
    name: "",
    date: moment().format("LLL"),
    comment: "",
  })
  const dispatch = useDispatch()

  const addCommentData = () => {
    dispatch(
      addComment({
        name: task.name,
        commentData: { ...comment, date: moment().format("LLL") },
      })
    )
    setComment({ name: "", date: moment().format("LLL"), comment: "" })
  }

  // Allows ESC key to only be used to close
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      changeCommentDisplay()
    }
  }

  // Allows for enter key to save details
  const saveOnEnterKeyDown = (e: any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addCommentData()
    }
  }

  // Allows access to use keys only when modal is displayed
  useEffect(() => {
    if (displayCommentModal === true) {
      document.body.addEventListener("keydown", closeOnEscapeKeyDown)
      document.body.addEventListener("keydown", saveOnEnterKeyDown)
    }
  }, [displayCommentModal])

  return (
    <div
      className={`modal ${displayCommentModal ? "show" : ""}`}
      onClick={changeCommentDisplay}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">Comments</h1>
        </div>
        <div className="modal-body">
          <div>
            <h2>Name</h2>
            <input
              type="text"
              value={comment.name}
              onChange={(e) => setComment({ ...comment, name: e.target.value })}
            />
          </div>
          <div>
            <h2>Comment</h2>
            <textarea
              value={comment.comment}
              onChange={(e) =>
                setComment({ ...comment, comment: e.target.value })
              }
            />
          </div>
          <div className="button-container">
            <button
              className="modal-post-btn"
              onClick={() => changeCommentDisplay()}
            >
              Close
            </button>
            <button
              style={{ marginLeft: "1rem" }}
              className="modal-post-btn"
              type="submit"
              onClick={() => addCommentData()}
            >
              Post
            </button>
          </div>
        </div>
        <div className="comments-body">
          {task.comments.map((comment) => {
            return (
              <div key={comment.comment} className="comment">
                <div className="top-comment">
                  <div className="top-comment-left">
                    <FaRegUser />
                    <p>{comment.name}</p>
                  </div>
                  <p>{comment.date}</p>
                </div>
                <p className="bottom-comment">{comment.comment}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentModal
/*
  
  add close button 
  change comment icon or something 
 

  - work on adding data to redux
    1) Add function to app page 
    2) add that to redux (or go straight to redux)
  
  - fix ui 
    - make some indication that there are comments 

  - maybe change color again 
  - add a lot of data 
  - make task end later 
  - add comments 
  - add form validation 

  figure out and add firebase for backend 

*/
