import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TasksSection from "./TaskSection/TaskSection";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";

import { ProjectDataProps, SectionProps } from "~/shared/interfaces/Projects";
import { AddItem } from "~/shared/components";

type TasksProps = {
  fakeData: ProjectDataProps;
  sections: SectionProps[];
  addNewSection: any;
  addNewTask: (name: string, section: string) => void;
  changeSectionOrder: (id: string, order: number, source: number) => void;
  changeTaskPosition: (
    id: string,
    section: string,
    order: number,
    source: string,
    sourceIndex: number
  ) => void;
  changeModalDisplay: (id: string) => void;
};

const Tasks = ({
  fakeData,
  sections,
  addNewSection,
  addNewTask,
  changeSectionOrder,
  changeTaskPosition,
  changeModalDisplay,
}: TasksProps) => {
  // handles the drag and drop
  const handleOnDrageEnd = (result: any) => {
    const { type, source, destination } = result;
    if (type === "droppable-category") {
      changeSectionOrder(result.draggableId, destination.index, source.index);
    } else if (type === "droppable-item") {
      console.log(result, "result");
      changeTaskPosition(
        result.draggableId,
        result.destination.droppableId,
        result.destination.index,
        source.droppableId,
        result.source.index
      );
    }
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
              {sections &&
                sections.map((section, index) => {
                  return (
                    <TasksSection
                      key={section.id}
                      section={section}
                      fakeData={fakeData}
                      addNewTask={addNewTask}
                      index={index}
                      changeModalDisplay={changeModalDisplay}
                    />
                  );
                })}
              {provided.placeholder}
              <div className="add-item-btn-container">
                <AddItem addNewItem={addNewSection} item={"list"} />
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
