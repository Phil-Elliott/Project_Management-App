import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH } from "react-icons/fa";

import { AddItem } from "~/shared/components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  ProjectDataProps,
  TaskProps,
  TasksSections,
} from "~/shared/interfaces/Projects";
import axios from "axios";
import { setOrderedTasks, setProjectTasks } from "~/ProjectSlice";

type TaskSectionProps = {
  section: TasksSections;
  addNewTask: (name: string, section: string, orderArr: number[]) => void;
  index: number;
  changeModalDisplay: (task: any, id: string) => void;
};

const TaskSection = ({
  section,
  addNewTask,
  index,
  changeModalDisplay,
}: TaskSectionProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [orderedArr, setOrderedArr] = useState<number[]>([]);
  const projectTasks = useSelector(
    (state: RootState) => state.project.projectTasks
  );
  const search = useSelector((state: RootState) => state.project.searchQuery);

  const dispatch = useDispatch();

  // gets all of the tasks on render
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
  }, [section]);

  useEffect(() => {
    dispatch(
      setOrderedTasks({ section: section.id.toString(), tasks: orderedArr })
    );
  }, [orderedArr]);

  useEffect(() => {
    dispatch(setProjectTasks({ tasks: tasks, section: section.id.toString() }));
  }, [tasks]);

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
                  {projectTasks[index] &&
                    projectTasks[index].tasks.map((task, index) => {
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

/*

  Elipsis
     1) Rename Section (Maybe just click on it to rename) and rename button does it for you
     2) Delete Section
    //  3) Sort Section
    //  4) Watch Section



*/
