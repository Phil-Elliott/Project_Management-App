import React from "react";
import { fakeDataProps } from "../../Board";
import "./TaskSection.scss";

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
        <h3>{section.name}</h3>
        <button>...</button>
      </div>
      <div className="taskSection-tasks">
        {fakeData.tasks.map((task) => {
          if (task.taskSection === section.name) {
            return (
              <div className="taskSection-task">
                <h4>{task.name}</h4>
                <p>{task.description}</p>
                <p>{task.due}</p>
                <button>...</button>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default TaskSection;
