import React from "react";
import { FaComment, FaEye } from "react-icons/fa";
import styles from "./Task.module.scss";
import { Draggable } from "react-beautiful-dnd";
import { Members } from "~/shared/components";
import { TaskProps } from "~/shared/interfaces/Projects";
import { useSelector } from "react-redux";
import { RootState } from "~/Dashboard/Store";

type TaskComponentProps = {
  taskData: TaskProps;
  index: number;
  changeModalDisplay: (id: string) => void;
};

const Task = ({ taskData, index, changeModalDisplay }: TaskComponentProps) => {
  const user = useSelector((state: RootState) => state.project.user);

  // checks if the task id is in the user's watched tasks
  const isWatched = user.watching.includes(taskData.id);

  return (
    <Draggable draggableId={taskData.id} index={index} key={taskData.id}>
      {(provided) => (
        <div
          className={styles.main}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={() => changeModalDisplay(taskData.id)}
        >
          <p className={styles.name}>{taskData.name}</p>
          <div className={styles.bottom}>
            <div className={styles["bottom-left"]}>
              {isWatched && <FaEye className={styles.icon} />}
              {taskData.comments[0] && <FaComment className={styles.icon} />}
            </div>
            <div className={styles["bottom-right"]}>
              <Members size={"med"} members={taskData.assignedTo} />
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;
