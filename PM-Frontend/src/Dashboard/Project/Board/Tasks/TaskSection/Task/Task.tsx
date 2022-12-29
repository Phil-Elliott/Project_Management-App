import React from "react";
import { FaComment, FaEye } from "react-icons/fa";
import styles from "./Task.module.scss";
import { TaskProps } from "../../../Interfaces";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Members } from "~/shared/components";

type TaskComponentProps = {
  taskData: TaskProps;
  index: number;
  changeModalDisplay: (id: string) => void;
};

const Task = ({ taskData, index, changeModalDisplay }: TaskComponentProps) => {
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
              <FaEye className={styles.icon} />
              <FaComment className={styles.icon} />
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
