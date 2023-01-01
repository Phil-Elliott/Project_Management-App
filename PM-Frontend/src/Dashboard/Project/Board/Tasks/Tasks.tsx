import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TasksSection from "./TaskSection/TaskSection";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";
import AddList from "../../../../shared/components/AddItemBttn/AddItem";
import { ProjectDataProps } from "~/shared/interfaces/Projects";

type TasksProps = {
  fakeData: ProjectDataProps;
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

type orderedSectionsProps = {
  id: string;
  name: string;
};

type sections = {
  id: string;
  name: string;
  order: number;
};

const Tasks = ({
  fakeData,
  addNewSection,
  addNewTask,
  changeSectionOrder,
  changeTaskPosition,
  changeModalDisplay,
}: TasksProps) => {
  const [orderedSections, setOrderedSections] = useState<
    orderedSectionsProps[]
  >([]);

  // orders the sections based off of their order to be displayed
  useEffect(() => {
    const sections = (fakeData.tasksSections as sections[]).map((section) => {
      return {
        id: section.id,
        name: section.name,
        order: section.order,
      };
    });
    const orderedSections = sections.sort((a, b) => {
      return a.order - b.order;
    });

    setOrderedSections(orderedSections);
  }, [fakeData.tasksSections]);

  // handles the drag and drop
  const handleOnDrageEnd = (result: any) => {
    const { type, source, destination } = result;
    if (type === "droppable-category") {
      changeSectionOrder(
        result.draggableId,
        destination.index + 1,
        source.index + 1
      );
    } else if (type === "droppable-item") {
      changeTaskPosition(
        result.draggableId,
        result.destination.droppableId,
        result.destination.index + 1,
        source.droppableId,
        result.source.index + 1
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
              {orderedSections.map((section, index) => {
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
