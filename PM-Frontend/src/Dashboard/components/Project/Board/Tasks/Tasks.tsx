import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TasksSection from "./TaskSection/TaskSection";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";
import AddList from "./Components/AddListBttn/AddItem";
import { fakeDataProps } from "../Interfaces";

type TasksProps = {
  fakeData: fakeDataProps;
  addNewSection: (name: string) => void;
  addNewTask: (name: string, section: string) => void;
  changeSectionOrder: (id: string, order: number, source: number) => void;
};

const Tasks = ({
  fakeData,
  addNewSection,
  addNewTask,
  changeSectionOrder,
}: TasksProps) => {
  const [orderedSections, setOrderedSections] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);

  // orders the sections based off of their order to be displayed
  useEffect(() => {
    const orderedSections = fakeData.tasksSections.sort((a, b) => {
      return a.order - b.order;
    });
    setOrderedSections(orderedSections);
  }, [fakeData.tasksSections]);

  /*
    find out where it came from and dont add 1 to anything after that

  */
  const handleOnDrageEnd = (result: any) => {
    const { type, source, destination } = result;
    if (type === "droppable-category") {
      changeSectionOrder(
        result.draggableId,
        destination.index + 1,
        source.index + 1
      );
    } else if (type === "droppable-item") {
      console.log("item");
    }
    // console.log(result.destination.index + 1);
    console.log(result);
  };

  return (
    <ScrollContainer
      className="scroll-container"
      ignoreElements=".add-item-btn-container, .taskSection-container"
      hideScrollbars={false}
    >
      <DragDropContext onDragEnd={handleOnDrageEnd}>
        <Droppable
          droppableId={"sections"}
          direction="horizontal"
          type="droppable-category"
        >
          {(provided) => (
            <div
              className="tasks-container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {orderedSections.map((section, index) => {
                return (
                  <TasksSection
                    key={section.id}
                    section={section}
                    fakeData={fakeData}
                    addNewTask={addNewTask}
                    index={index}
                  />
                );
              })}
              {provided.placeholder}
              <div className="add-item-btn-container">
                <AddList addNewItem={addNewSection} item={"list"} />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </ScrollContainer>
  );
};

export default Tasks;

/*  
  make indiana scroll only work on empty space outside of tasks sections



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
