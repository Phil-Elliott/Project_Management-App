import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH, FaPlus } from "react-icons/fa";

import { fakeDataProps, TaskProps } from "../../Interfaces";
import { AddItem } from "~/shared/components";

type TaskSectionProps = {
  section: {
    id: string;
    name: string;
  };
  fakeData: fakeDataProps;
  addNewTask: (name: string, section: string) => void;
  index: number;
  changeModalDisplay: (id: string) => void;
};

const TaskSection = ({
  section,
  fakeData,
  addNewTask,
  index,
  changeModalDisplay,
}: TaskSectionProps) => {
  const [orderedTasks, setOrderedTasks] = useState<TaskProps[]>([]);

  useEffect(() => {
    const filteredTasks = fakeData.tasks.filter((task) => {
      return task.taskSection.section === section.name;
    });

    const orderedTasks = filteredTasks.sort((a, b) => {
      return Number(a.taskSection.order) - Number(b.taskSection.order);
    });
    setOrderedTasks(orderedTasks);
  }, [fakeData.tasks]);

  return (
    <Draggable draggableId={section.id} index={index} key={section.id}>
      {(provided) => (
        <div
          className="taskSection-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={section.id} type="droppable-item">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="taskSection-header">
                  <p>{section.name}</p>
                  <FaEllipsisH className="ellipsis" />
                </div>

                <div className="taskSection-tasks">
                  {orderedTasks.map((task, index) => {
                    return (
                      <Task
                        key={task.id}
                        taskData={task}
                        index={index}
                        changeModalDisplay={changeModalDisplay}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <AddItem
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
