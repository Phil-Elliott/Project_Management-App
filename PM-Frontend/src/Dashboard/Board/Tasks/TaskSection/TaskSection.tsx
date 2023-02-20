import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH, FaTimes } from "react-icons/fa";

import { AddItem, Popup } from "~/shared/components";
import { useDebounce } from "usehooks-ts";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  ProjectDataProps,
  TaskProps,
  TasksSections,
} from "~/shared/interfaces/Projects";
import axios from "axios";
import { setOrderedTasks, setProjectTasks, setSections } from "~/ProjectSlice";

type TaskSectionProps = {
  section: TasksSections;
  addNewTask: (name: string, section: string, orderArr: number[]) => void;
  index: number;
  changeModalDisplay: (task: any, id: string) => void;
  sections: TasksSections[];
};

const TaskSection = ({
  section,
  addNewTask,
  index,
  changeModalDisplay,
  sections,
}: TaskSectionProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [orderedArr, setOrderedArr] = useState<number[]>([]);
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(titleValue, 1000);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTitleValue(section.title);
  }, [section]);

  useEffect(() => {
    updateSectionTitle();
  }, [debouncedValue]);

  const projectTasks = useSelector(
    (state: RootState) => state.project.projectTasks
  );
  const search = useSelector((state: RootState) => state.project.searchQuery);

  const dispatch = useDispatch();

  // deletes the section
  async function handleDeleteSection() {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/sections/${section.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      dispatch(
        setSections(
          sections.filter((section: TasksSections) => {
            return section.id !== res.data.data.id;
          })
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

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

  // updates the title of the task section
  async function updateSectionTitle() {
    if (titleValue === section.title) return;
    if (!titleValue || titleValue === "") return;
    try {
      const res = await axios.put(
        `http://localhost:1337/api/sections/${section.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            title: titleValue,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  const toggleDisplayPopup = () => {
    setDisplayPopup(!displayPopup);
  };

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
                  <input
                    type="text"
                    value={titleValue}
                    onChange={(e) => setTitleValue(e.target.value)}
                    ref={inputRef}
                  />
                  <div
                    className="ellipsis-container"
                    onClick={() => toggleDisplayPopup()}
                  >
                    <FaEllipsisH className="ellipsis" />
                  </div>
                </div>
                {displayPopup && (
                  <Popup close={() => setDisplayPopup(!displayPopup)}>
                    <div className="section-popup-container">
                      <div className="popup-header">
                        <h3>List Options</h3>
                        <FaTimes
                          onClick={() => setDisplayPopup(false)}
                          className="popup-close-icon"
                        />
                      </div>
                      <div className="popup-content">
                        <div
                          className="popup-item"
                          onClick={() => {
                            setDisplayPopup(false);
                            inputRef.current?.focus();
                          }}
                        >
                          <p>Rename List</p>
                        </div>
                        <div
                          className="popup-item"
                          onClick={() => handleDeleteSection()}
                        >
                          <p>Delete List</p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}

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



*/
