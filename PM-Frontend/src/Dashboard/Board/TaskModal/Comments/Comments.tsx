import React, { useEffect, useState } from "react";
import { Avatar, Button } from "~/shared/components";

import CommentData from "./Comment/Comment";
import styles from "./Comments.module.scss";
import { MdInsertComment } from "react-icons/md";

import moment from "moment";
import { TaskProps, User } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../TaskModal";
import axios from "axios";

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

  // add a comment to the database
  async function addComment() {
    try {
      const res = await axios.post(
        `https://strapi-production-7520.up.railway.app/api/comments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            content: comment,
            project: taskData.project.data.id,
            task: id,
            users_permissions_user: user!.id,
          },
        }
      );
      fetchTask();
    } catch (err) {
      console.log(err);
    }
  }

  // update a user's comment
  async function updateComment(commentId: string) {
    try {
      const res = await axios.put(
        `https://strapi-production-7520.up.railway.app/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            content: comment,
          },
        }
      );
      fetchTask();
    } catch (err) {
      console.log(err);
    }
  }

  // delete a user's comment
  async function deleteComment(commentId: string) {
    try {
      const res = await axios.delete(
        `https://strapi-production-7520.up.railway.app/api/comments/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      fetchTask();
    } catch (err) {
      console.log(err);
    }
  }

  const handleSave = () => {
    setDisplayButtons(false);
    addComment();
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

  let image = user.avatar;
  if (image === null) {
    image = user.username[0].toUpperCase();
  }

  // change the order of the comments. last one first

  return (
    <div className={styles.main}>
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
        {taskData.comments?.data.reverse().map((comment: any) => {
          return (
            <CommentData
              comment={comment}
              key={comment.id}
              deleteComment={deleteComment}
              updateComment={updateComment}
              userId={user.id}
            />
          );
        })}
      </div>
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
