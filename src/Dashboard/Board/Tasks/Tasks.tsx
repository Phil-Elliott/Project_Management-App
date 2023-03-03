import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TasksSection from "./TaskSection/TaskSection";
import ScrollContainer from "react-indiana-drag-scroll";
import "./Tasks.scss";

import { TasksSections } from "~/shared/interfaces/Projects";
import { AddItem } from "~/shared/components";

type TasksProps = {
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
  changeModalDisplay: (task: any, id: string, sectionId: string) => void;
};

const Tasks = ({
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
        destination.droppableId,
        destination.index,
        source.droppableId,
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
                      addNewTask={addNewTask}
                      index={index}
                      changeModalDisplay={changeModalDisplay}
                      sections={sections}
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
