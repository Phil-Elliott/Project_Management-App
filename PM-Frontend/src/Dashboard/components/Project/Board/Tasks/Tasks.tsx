import React from "react";
import TasksSection from "./TaskSection/TaskSection";
import { fakeDataProps } from "../Board";
import "./Tasks.scss";

type TasksProps = {
  fakeData: fakeDataProps;
};

const Tasks = ({ fakeData }: TasksProps) => {
  return (
    <div className="tasks-container">
      {fakeData.tasksSections.map((section) => {
        return <TasksSection section={section} fakeData={fakeData} />;
      })}
      <button>Add another list</button>
    </div>
  );
};

export default Tasks;

/*
    Map through sections and create a taskSection component for each one
    Need an AddTaskSectionComponent at end
        Could be a button 
        Use additem component when it is clicked

*/
