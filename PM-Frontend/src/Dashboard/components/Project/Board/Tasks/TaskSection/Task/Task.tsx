import React from "react";
import { Members } from "../../../NavOptions";
import { FaComment, FaEye } from "react-icons/fa";
import "./Task.scss";
import { TaskProps } from "../../../Interfaces";
import { Draggable, Droppable } from "react-beautiful-dnd";

type TaskComponentProps = {
  taskData: TaskProps;
  index: number;
};

const Task = ({ taskData, index }: TaskComponentProps) => {
  return (
    <Draggable draggableId={taskData.id} index={index} key={taskData.id}>
      {(provided) => (
        <div
          className="taskSection-task"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
      )}
    </Draggable>
  );
};

export default Task;
