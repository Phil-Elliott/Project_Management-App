import React, { useEffect, useState } from "react";
import { FaComment, FaEye } from "react-icons/fa";
import styles from "./Task.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { Members } from "~/shared/components";
import { TaskProps } from "~/shared/interfaces/Projects";
import { useSelector } from "react-redux";
import { RootState } from "~/Store";
import axios from "axios";

type TaskComponentProps = {
  taskData: TaskProps;
  index: number;
  changeModalDisplay: (task: any, id: string) => void;
};

const Task = ({ taskData, index, changeModalDisplay }: TaskComponentProps) => {
  const [comments, setComments] = useState<any>([]);
  const [watching, setWatching] = useState<any>([]);
  const [assigned, setAssigned] = useState<any>([]);
  // const [task, setTask] = useState<any>();

  const user = useSelector((state: RootState) => state.project.user);

  // Fetches the data to know if there are comments and if it is being watched by the user
  async function fetchProject() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/tasks/${taskData.id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      // setTask(res.data.data.attributes);
      setComments(res.data.data.attributes.comments.data);
      setWatching(res.data.data.attributes.watching_users.data);
      setAssigned(
        res.data.data.attributes.assigned_users.data.map((user: any) => {
          return {
            id: user.id,
            username: user.attributes.username,
            avatar: user.attributes.avatar,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [taskData]);

  // checks if the task id is in the user's watched tasks
  const isWatched = watching.some((member: any) => member.id === user.id);

  return (
    <Draggable
      draggableId={`t${taskData.id.toString()}`}
      index={index}
      key={taskData.id}
    >
      {(provided) => (
        <div
          className={styles.main}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          // onClick={() => changeModalDisplay(task)}
        >
          <p className={styles.name}>{taskData.title}</p>
          <div className={styles.bottom}>
            <div className={styles["bottom-left"]}>
              {isWatched && <FaEye className={styles.icon} />}
              {comments[0] && <FaComment className={styles.icon} />}
            </div>
            <div className={styles["bottom-right"]}>
              <Members size={"med"} members={assigned} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
