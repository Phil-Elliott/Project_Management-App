import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH } from "react-icons/fa";

import {
  ProjectDataProps,
  TaskProps,
} from "../../../../../shared/interfaces/Projects";
import { AddItem } from "~/shared/components";

import { useSelector } from "react-redux";
import { RootState } from "~/Dashboard/Store";

type TaskSectionProps = {
  section: {
    id: string;
    name: string;
    tasks: string[];
  };
  fakeData: ProjectDataProps;
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
  const search = useSelector((state: RootState) => state.project.searchQuery);

  useEffect(() => {
    setOrderedTasks(
      section.tasks
        .map((task) => {
          return fakeData.tasks.find((t) => t.id === task);
        })
        .filter((task) => task !== undefined) as TaskProps[]
    );
  }, [section, section.tasks]);

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
                    if (
                      search === "" ||
                      task.name.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return (
                        <Task
                          key={task.id}
                          taskData={task}
                          index={index}
                          changeModalDisplay={changeModalDisplay}
                        />
                      );
                    }
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <AddItem addNewItem={addNewTask} item={"task"} section={section.id} />
        </div>
      )}
    </Draggable>
  );
};

export default TaskSection;
// setTasks(fakeData.tasks.filter((task) => section.tasks.includes(task.id)));

/*
// const [tasks, setTasks] = useState<TaskProps[]>([]);
  // const [taskOrder, setTaskOrder] = useState<string[]>([]);
// useEffect(() => {
  //   // setTaskOrder(section.tasks);
  //   setTasks(
  //     section.tasks
  //       .map((task) => {
  //         return fakeData.tasks.find((t) => t.id === task);
  //       })
  //       .filter((task) => task !== undefined) as TaskProps[]
  //   );
  // }, [section, section.tasks]);

*/
