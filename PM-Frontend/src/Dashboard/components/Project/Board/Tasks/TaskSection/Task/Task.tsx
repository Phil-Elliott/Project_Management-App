import React from "react";
import { TaskProps } from "../../../Board";
import { Members } from "../../../NavOptions";
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
          <p>p</p>
          <p>t</p>
          <p>f</p>
        </div>
        <div className="task-bottom-right">
          {taskData.assignedTo.map((member) => {
            return <Members members={[member]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Task;
