import React, { useEffect, useState } from "react";
import { FaComment, FaEye } from "react-icons/fa";
import styles from "./Task.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { Members } from "~/shared/components";
import { TaskProps } from "~/shared/interfaces/Projects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import axios from "axios";
import { updateTask } from "~/ProjectSlice";

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
  const [comments, setComments] = useState<any>(taskData.comments);
  const [watching, setWatching] = useState<any>(taskData.watching);
  const [assigned, setAssigned] = useState<any>(taskData.assigned);
  const [task, setTask] = useState<any>();
  const [taskTitle, setTaskTitle] = useState<string>(taskData.title);

  const user = useSelector((state: RootState) => state.project.user);
  const currentTask = useSelector(
    (state: RootState) => state.project.currentTask
  );

  const dispatch = useDispatch();

  // Fetches the data to know if there are comments and if it is being watched by the user
  async function fetchTask() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/tasks/${taskData.id}`,
        { withCredentials: true }
      );

      if (taskTitle !== res.data.data.attributes.title) {
        setTaskTitle(res.data.data.attributes.title);
      }
      setTask(res.data.data.attributes);
      if (res.data.data.attributes.comments.length !== comments) {
        setComments(res.data.data.attributes.comments);
        dispatch(
          updateTask({
            section: sectionId,
            taskId: taskData.id,
            type: "comments",
            value: res.data.data.attributes.comments,
          })
        );
      }
      if (res.data.data.attributes.watching_users !== watching) {
        setWatching(res.data.data.attributes.watching_users);
        dispatch(
          updateTask({
            section: sectionId,
            taskId: taskData.id,
            type: "watching",
            value: res.data.data.attributes.watching_users,
          })
        );
      }

      let assignedUsers = res.data.data.attributes.assigned_users.map(
        (aUser: any) => {
          console.log(aUser, "aUser");
          return {
            id: aUser._id,
            username: aUser.username,
            avatar: aUser.avatar,
          };
        }
      );

      if (assignedUsers !== assigned) {
        setAssigned(assignedUsers);
        dispatch(
          updateTask({
            section: sectionId,
            taskId: taskData.id,
            type: "assigned",
            value: assignedUsers,
          })
        );
      }
    } catch (err) {
      // console.log(err);
    }
  }

  useEffect(() => {
    fetchTask();
  }, []);

  useEffect(() => {
    if (currentTask) {
      if (currentTask.id === taskData.id) {
        fetchTask();
      }
    }
  }, [currentTask]);

  // checks if the task id is in the user's watched tasks
  const isWatched = watching.some((member: any) => member._id === user.id);

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

Need to do the same with 
1) Comments
2) Watching
3) Assigned




*/
