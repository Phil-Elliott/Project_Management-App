import React, { useEffect, useState } from "react";
import { Avatar, Button } from "~/shared/components";

import CommentData from "./Comment/Comment";
import styles from "./Comments.module.scss";
import uuid from "react-uuid";
import moment from "moment";
import { TaskProps } from "~/shared/interfaces/Projects";

type CommentsProps = {
  taskData: TaskProps;
  updateTaskData: (key: keyof TaskProps, value: any) => void;
  user: string;
  display: boolean;
};

const Comments = ({
  taskData,
  updateTaskData,
  user,
  display,
}: CommentsProps) => {
  const [displayButtons, setDisplayButtons] = useState(false);
  const [comment, setComment] = useState<string>("");

  const handleSave = () => {
    setDisplayButtons(false);
    const commentData = {
      id: uuid(),
      member: user,
      date: moment().format("MMM Do YYYY"),
      comment: comment,
    };
    updateTaskData("comments", [...taskData.comments, commentData]);
    setComment("");
  };

  const handleCancel = () => {
    setDisplayButtons(false);
    setComment("");
  };

  useEffect(() => {
    setComment("");
    setDisplayButtons(false);
  }, [display]);

  return (
    <div className={styles.main}>
      <h3 className={styles.header}>Comments</h3>
      <div className={styles.input}>
        <div className={styles.user}>
          <Avatar user={"Bob"} />
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onClick={() => setDisplayButtons(true)}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      {displayButtons ? (
        <div className={styles.buttons}>
          <Button
            variant={"primary"}
            handleClick={() => handleSave()}
            space={true}
          >
            Save
          </Button>
          <Button variant={"secondary"} handleClick={() => handleCancel()}>
            Cancel
          </Button>
        </div>
      ) : null}
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

add enter key functionality

*/
