import React from "react";
import { Avatar } from "~/shared/components";
import { TaskProps } from "../../../../../shared/interfaces/Projects";
import CommentData from "./Comment/Comment";
import styles from "./Comments.module.scss";

type CommentsProps = {
  taskData: TaskProps;
};

const Comments = ({ taskData }: CommentsProps) => {
  return (
    <div className={styles.main}>
      <p className={styles.header}>Comments</p>
      <div className={styles.input}>
        <div className={styles.user}>
          <Avatar user={"Bob"} />
        </div>
        <input type="text" placeholder="Add a comment..." />
      </div>
      <div className={styles.comments}>
        {taskData.comments.map((comment) => {
          return <CommentData comment={comment} />;
        })}
      </div>
    </div>
  );
};

export default Comments;

/*

  1) user picture 
  2) input field

  Map through the comments
  left side
  image top left
  right side
  name top right (days ago)
  comment
  edit and delete bttn on bottom


  create the ui for now 
  add user functionality later

  probably going to be a user data object
  user {
    name: string,
    picture: string,
    id: string
    reminders: string[]
    projects: string[]
  }



*/
