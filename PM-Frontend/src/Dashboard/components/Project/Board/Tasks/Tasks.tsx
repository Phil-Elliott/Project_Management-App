import React from "react";
import TasksSection from "./TaskSection/TaskSection";
import { fakeDataProps } from "../Board";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";
import AddList from "./AddListBttn/AddList";

type TasksProps = {
  fakeData: fakeDataProps;
};

const Tasks = ({ fakeData }: TasksProps) => {
  return (
    <ScrollContainer className="scroll-container">
      <div className="tasks-container">
        {fakeData.tasksSections.map((section) => {
          return <TasksSection section={section} fakeData={fakeData} />;
        })}
        <AddList />
      </div>
    </ScrollContainer>
  );
};

export default Tasks;

/*
  <div className="add-task-btn-container">
          <div className="taskSection-header"></div>
          <button className="add-task-btn">
            <FaPlus className="plus-button" />
            <p>Add another list</p>
          </button>
        </div>
        <div className="taskSection-container">
          <div className="taskSection-header"></div>
          <button>
            <FaPlus className="plus-button" />
            <p>Add another list</p>
          </button>
        </div>



  fix up the styling for the tasks section
  fix up the add button at the end 
  make sure you can scroll left


    Map through sections and create a taskSection component for each one
    Need an AddTaskSectionComponent at end
        Could be a button 
        Use additem component when it is clicked

*/
