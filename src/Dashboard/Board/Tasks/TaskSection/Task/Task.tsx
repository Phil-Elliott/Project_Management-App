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
  changeModalDisplay: (task: any, id: string, sectionId: string) => void;
  sectionId: string;
};

const Task = ({
  taskData,
  index,
  changeModalDisplay,
  sectionId,
}: TaskComponentProps) => {
  const [comments, setComments] = useState<any>([]);
  const [watching, setWatching] = useState<any>([]);
  const [assigned, setAssigned] = useState<any>([]);
  const [task, setTask] = useState<any>();
  const [taskTitle, setTaskTitle] = useState<string>("");

  const user = useSelector((state: RootState) => state.project.user);
  const currentTask = useSelector(
    (state: RootState) => state.project.currentTask
  );

  // Fetches the data to know if there are comments and if it is being watched by the user
  async function fetchTask() {
    try {
      const res = await axios.get(
        `https://strapi-production-7520.up.railway.app/api/tasks/${taskData.id}?populate=*`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setTaskTitle(res.data.data.attributes.title);
      setTask(res.data.data.attributes);
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
    fetchTask();
    setTaskTitle(taskData.title);
  }, [taskData]);

  useEffect(() => {
    if (currentTask) {
      if (currentTask.id === taskData.id) {
        fetchTask();
      }
    }
  }, [currentTask]);

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
          onClick={() => changeModalDisplay(task, taskData.id, sectionId)}
        >
          <p className={styles.name}>{taskTitle}</p>
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

/*


  Maybe pass the task data back to hear or into a state to be picked up if the id is matching


  Need to cut the name and put it into the other section or something
*/
