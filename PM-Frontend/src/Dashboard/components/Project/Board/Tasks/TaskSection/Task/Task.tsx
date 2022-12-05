import React from "react";
import { TaskProps } from "../../../Board";
import { Members } from "../../../NavOptions";
import { FaComment, FaEye } from "react-icons/fa";
import "./Task.scss";

type TaskComponentProps = {
  taskData: TaskProps;
};

const Task = ({ taskData }: TaskComponentProps) => {
  return (
    <div className="taskSection-task">
      <p>{taskData.name}</p>
      <div className="task-bottom-container">
        <div className="task-bottom-left">
          <FaEye className="task-icon" />
          <FaComment className="task-icon" />
        </div>
        <div className="task-bottom-right">
          <Members size={"med"} members={taskData.assignedTo} />
        </div>
      </div>
    </div>
  );
};

export default Task;
