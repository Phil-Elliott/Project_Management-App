import React from "react";
import { fakeDataProps } from "../../Board";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH, FaPlus } from "react-icons/fa";

type TaskSectionProps = {
  section: {
    id: string;
    name: string;
  };
  fakeData: fakeDataProps;
};

const TaskSection = ({ section, fakeData }: TaskSectionProps) => {
  return (
    <div className="taskSection-container">
      <div className="taskSection-header">
        <p>{section.name}</p>
        <FaEllipsisH className="ellipsis" />
      </div>
      <div className="taskSection-tasks">
        {fakeData.tasks.map((task) => {
          if (task.taskSection === section.name) {
            return <Task taskData={task} />;
          }
        })}
      </div>
      <button>
        <FaPlus className="plus-button" />
        <p>Add a card</p>
      </button>
    </div>
  );
};

export default TaskSection;
