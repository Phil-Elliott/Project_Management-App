import React from "react";
import { fakeDataProps } from "../../Board";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import AddList from "../Components/AddListBttn/AddItem";

type TaskSectionProps = {
  section: {
    id: string;
    name: string;
  };
  fakeData: fakeDataProps;
  addNewTask: (name: string, section: string) => void;
  index: number;
};

const TaskSection = ({
  section,
  fakeData,
  addNewTask,
  index,
}: TaskSectionProps) => {
  return (
    <Draggable draggableId={section.id} index={index}>
      {(provided) => (
        <div
          className="taskSection-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
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
          <AddList
            addNewItem={addNewTask}
            item={"task"}
            section={section.name}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskSection;
