import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Loader } from "~/shared/components";

import CommentData from "./Comment/Comment";
import styles from "./Comments.module.scss";
import { MdInsertComment } from "react-icons/md";

import { TaskProps, User } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../TaskModal";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateTask } from "~/ProjectSlice";

type CommentsProps = {
  taskData: any;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
  user: User;
  display: boolean;
  id: string;
  fetchTask: () => void;
};

const Comments = ({
  taskData,
  updateTaskData,
  user,
  display,
  id,
  fetchTask,
}: CommentsProps) => {
  const [displayButtons, setDisplayButtons] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [reverseComments, setReverseComments] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    handleLoader();
  }, []);

  function handleLoader() {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }

  useEffect(() => {
    if (taskData.comments) {
      let commentsArr = [...taskData.comments];

      setReverseComments(commentsArr.reverse());
    }
  }, [taskData.comments]);

  // add a comment to the database
  async function addComment() {
    const payload = {
      content: comment,
      project: taskData.project,
      task: id,
      users_permissions_user: user!.id,
    };

    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/comments`,
        payload,
        { withCredentials: true }
      );
      handleLoader();
      fetchTask();
      dispatch(
        updateTask({
          section: taskData.section.data.id,
          taskId: id,
          type: "comments",
          value: comment,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  // update a user's comment
  async function updateComment(commentId: string, content: string) {
    const payload = {
      content: content,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/comments/${commentId}`,
        payload,
        { withCredentials: true }
      );
      fetchTask();

      dispatch(
        updateTask({
          section: taskData.section.data.id,
          taskId: id,
          type: "comments",
          value: content,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  // delete a user's comment
  async function deleteComment(commentId: string) {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/v1/comments/${commentId}`,
        { withCredentials: true }
      );

      fetchTask();
      dispatch(
        updateTask({
          section: taskData.section.data.id,
          taskId: id,
          type: "comments",
          value: comment,
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  const handleSave = () => {
    setDisplayButtons(false);
    addComment();
    setComment("");
    handleBlur();
  };

  const handleCancel = () => {
    setDisplayButtons(false);
    setComment("");
    handleBlur();
  };

  useEffect(() => {
    setComment("");
    setDisplayButtons(false);
  }, [display]);

  let image = user.avatar;
  if (image === null || image === "") {
    image = user.username[0].toUpperCase();
  }

  function handleBlur() {
    if (inputRef.current !== null) {
      inputRef.current.blur();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && displayButtons === true && comment !== "") {
      handleSave();
    }
    if (e.key === "Escape" && displayButtons === true) {
      handleCancel();
    }
  }

  return (
    <div className={styles.main} onKeyDown={(e) => handleKeyDown(e)}>
      <div className={styles.header}>
        <MdInsertComment className={styles.icon} />
        <h3>Comments</h3>
      </div>
      <div className={styles.input}>
        <div className={styles.user}>
          <Avatar avatar={image} />
        </div>
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onClick={() => setDisplayButtons(true)}
          onChange={(e) => setComment(e.target.value)}
          ref={inputRef}
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
      <div
        className={styles.comments}
        style={loading ? { display: "" } : { display: "none" }}
      >
        {reverseComments?.map((comment: any) => {
          return (
            <CommentData
              comment={comment}
              key={comment._id}
              deleteComment={deleteComment}
              updateComment={updateComment}
              userId={user.id}
            />
          );
        })}
      </div>
      {!loading && (
        <div className={styles["loader-container"]}>
          <Loader size={200} scale />
        </div>
      )}
    </div>
  );
};

export default Comments;

/*
  2) Have comment get updated in the database

  3) Have a reply button for other comments (just puts you into input with @username)
  4) Add things to comment box
        mention a member
        add an emoji

*/
