import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH } from "react-icons/fa";

import { AddItem } from "~/shared/components";

import { useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  ProjectDataProps,
  TaskProps,
  TasksSections,
} from "~/shared/interfaces/Projects";
import axios from "axios";

type TaskSectionProps = {
  section: TasksSections;
  fakeData: ProjectDataProps;
  addNewTask: (name: string, section: string, orderArr: number[]) => void;
  index: number;
  changeModalDisplay: (task: any, id: string) => void;
};

const TaskSection = ({
  section,
  fakeData,
  addNewTask,
  index,
  changeModalDisplay,
}: TaskSectionProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [orderedArr, setOrderedArr] = useState<number[]>([]);
  const search = useSelector((state: RootState) => state.project.searchQuery);
  const tasksTest = useSelector((state: RootState) => state.project.tasks);

  async function fetchTasks() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/sections/${section.id}?populate=ordered_tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      // setTasks(res.data.data.attributes.tasks.data);

      setTasks(
        res.data.data.attributes.ordered_tasks.data.map((task: any) => {
          return {
            id: task.id,
            title: task.attributes.title,
            description: task.attributes.description,
            due: task.attributes.due,
            priority: task.attributes.priority,
            order: task.attributes.order,
          };
        })
      );
      // Gets an array of the order of the tasks by id
      setOrderedArr(
        res.data.data.attributes.ordered_tasks.data.map((task: any) => {
          return task.id;
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, [section, tasksTest]);

  return (
    <Draggable
      draggableId={`s${section.id.toString()}`}
      index={index}
      key={section.id}
    >
      {(provided) => (
        <div
          className="taskSection-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable
            droppableId={`s${section.id.toString()}`}
            type="droppable-item"
          >
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="taskSection-header">
                  <p>{section.title}</p>
                  <FaEllipsisH className="ellipsis" />
                </div>

                <div className="taskSection-tasks">
                  {tasks.map((task, index) => {
                    if (
                      search === "" ||
                      task.title.toLowerCase().includes(search.toLowerCase())
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
          <AddItem
            addNewItem={addNewTask}
            item={"task"}
            section={section.id}
            orderedArr={orderedArr}
          />
        </div>
      )}
    </Draggable>
  );
};

export default TaskSection;

// let sortedArray = tasks.slice().sort((a, b) => {
//   return a.order - b.order;
// });
// setOrderedTasks(sortedArray);
// console.log(orderedTasks);
// useEffect(() => {
//   console.log(tasks);
// }, [tasks]);

// useEffect(() => {
//   setOrderedTasks(
//     section.tasks
//       .map((task) => {
//         return fakeData.tasks.find((t) => t.id === task);
//       })
//       .filter((task) => task !== undefined) as TaskProps[]
//   );
// }, [section, section.tasks, fakeData]);
