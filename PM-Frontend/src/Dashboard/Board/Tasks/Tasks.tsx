import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TasksSection from "./TaskSection/TaskSection";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";

import { ProjectDataProps, TasksSections } from "~/shared/interfaces/Projects";
import { AddItem } from "~/shared/components";

type TasksProps = {
  fakeData: ProjectDataProps;
  sections: TasksSections[];
  addNewSection: (name: string, orderedArr: number[]) => void;
  addNewTask: (name: string, section: string, orderedArr: number[]) => void;
  changeSectionOrder: (
    id: string,
    destination: number,
    source: number,
    orderArr: number[]
  ) => void;
  changeTaskPosition: (
    id: string,
    section: string,
    order: number,
    source: string,
    sourceIndex: number
  ) => void;
  changeModalDisplay: (task: any, id: string) => void;
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
  const [orderedSectionsArr, setOrderedSectionsArr] = useState<number[]>([]);

  // Gets an array of the order of the sections by id
  useEffect(() => {
    setOrderedSectionsArr(
      sections.map((section: any) => {
        return section.id;
      })
    );
  }, [sections]);

  // handles the drag and drop
  const handleOnDrageEnd = async (result: any) => {
    const { type, source, destination } = result;

    if (type === "droppable-category" && source.index !== destination.index) {
      changeSectionOrder(
        result.draggableId,
        destination.index,
        source.index,
        orderedSectionsArr
      );
    } else if (type === "droppable-item") {
      changeTaskPosition(
        result.draggableId,
        // section where it is going
        destination.droppableId,
        // where it is going in the order
        destination.index,
        // section where it came from
        source.droppableId,
        // where it came from in the order
        source.index
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
                <AddItem
                  addNewItem={addNewSection}
                  item={"list"}
                  orderedArr={orderedSectionsArr}
                />
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

// useEffect(() => {
//   let sortedArray = sections.slice().sort((a, b) => {
//     return a.order - b.order;
//   });
//   setOrderedSections(sortedArray);
// }, [sections]);
