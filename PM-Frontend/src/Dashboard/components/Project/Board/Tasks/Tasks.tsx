import React, { useEffect, useState } from "react";
import TasksSection from "./TaskSection/TaskSection";
import { fakeDataProps } from "../Board";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";
import AddList from "./AddListBttn/AddList";

type TasksProps = {
  fakeData: fakeDataProps;
  addNewSection: (name: string) => void;
};

const Tasks = ({ fakeData, addNewSection }: TasksProps) => {
  const [orderedSections, setOrderedSections] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  useEffect(() => {
    const orderedSections = fakeData.tasksSections.sort((a, b) => {
      return a.order - b.order;
    });
    setOrderedSections(orderedSections);
  }, [fakeData.tasksSections]);

  return (
    <ScrollContainer className="scroll-container">
      <div className="tasks-container">
        {orderedSections.map((section) => {
          return <TasksSection section={section} fakeData={fakeData} />;
        })}
        <AddList addNewSection={addNewSection} />
      </div>
    </ScrollContainer>
  );
};

export default Tasks;

/*

  for loop 
    put in order 


  add one to each order after the order of the one you are adding

  could make a custom hook or function for putting things in order
  also make a hook for changing the order of all based off of movement



  fix up the styling for the tasks section
  fix up the add button at the end 
  make sure you can scroll left


    Map through sections and create a taskSection component for each one
    Need an AddTaskSectionComponent at end
        Could be a button 
        Use additem component when it is clicked

*/
