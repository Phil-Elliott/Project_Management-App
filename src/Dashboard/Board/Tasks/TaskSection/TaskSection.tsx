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
import {
  setOrderedTasks,
  setProjectTasks,
  setProjectTasksOrder,
  setSections,
  deleteSection,
} from "~/ProjectSlice";
import ConfirmModal from "~/shared/components/ConfirmModal/ConfirmModal";

type TaskSectionProps = {
  section: TasksSections;
  addNewTask: (name: string, section: string, orderArr: number[]) => void;
  index: number;
  changeModalDisplay: (task: any, id: string, sectionId: string) => void;
  sections: TasksSections[];
  user: any;
};

const TaskSection = ({
  section,
  addNewTask,
  index,
  changeModalDisplay,
  sections,
  user,
}: TaskSectionProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const [orderedArr, setOrderedArr] = useState<number[]>([]);
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(titleValue, 1000);

  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const [filteredTasks, setFilteredTasks] = useState<TaskProps[]>([]);

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
  const filterData = useSelector(
    (state: RootState) => state.project.filterData
  );

  useEffect(() => {
    if (filterData) {
      getFilteredTasks();
    }
  }, [projectTasks, filterData]);

  /*
      Do a ternary on the bottom to show filterTasks when it is not empty
      and show tasks when it is empty

      Exact
        - Need to filter the tasks based of of the options in the filterData
        - Should match each option chosen

      Not Exact
        - Need to filter the tasks based of of the options in the filterData
        - Should match at least one option chosen

       Could use a switch statement for not exact
       could also maybe write out the conditions as variables and then use those
       Will need to pass the users info to do the watching part


       maybe map through the filterData and see what needs to be applied to the filter function

  */

  function getFilteredTasks() {
    // exact check
    const checkExact = (task: TaskProps) => {
      // console.log("check exact", task);
      if (filterData.noMembers && task.assigned.length > 0) {
        return false;
      }
      return true;
    };

    const checkNotExact = (task: TaskProps) => {
      // console.log("check not exact", task);
      if (filterData.noMembers && task.assigned.length > 0) {
        return false;
      }
      return true;
    };

    if (filterData.exact) {
      setFilteredTasks(
        projectTasks[index]?.tasks.filter((task) => {
          if (checkExact(task)) {
            return true;
          } else {
            return false;
          }
        })
      );
    } else if (!filterData.exact) {
      console.log("not exact");
      setFilteredTasks(
        projectTasks[index]?.tasks.filter((task) => {
          if (checkNotExact(task)) {
            return true;
          } else {
            return false;
          }
        })
      );
    }
  }

  const dispatch = useDispatch();

  // deletes the section
  async function handleDeleteSection() {
    try {
      const res = await axios.delete(
        `https://strapi-production-7520.up.railway.app/api/sections/${section.id}`,
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
      // need to handle local state here
      // It would also be good to delete all tasks associated with the list
      // Change sections, projectTasks, and  orderedTasks
      dispatch(deleteSection(section.id.toString()));
    } catch (err) {
      console.log(err);
    }
  }

  // gets all of the tasks on render
  async function fetchTasks() {
    try {
      const res = await axios.get(
        `https://strapi-production-7520.up.railway.app/api/sections/${section.id}?populate=ordered_tasks`,
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
            comments: [],
            watching: [],
            assigned: [],
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
        `https://strapi-production-7520.up.railway.app/api/sections/${section.id}`,
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

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const toggleDisableCloseModal = (disable: boolean) => {
    setDisableCloseModal(disable);
  };

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

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
                          onClick={() => toggleDeleteModal()}
                        >
                          <p>Delete List</p>
                        </div>
                      </div>
                    </div>
                  </Popup>
                )}
                <ConfirmModal
                  display={displayConfirm}
                  closeModal={toggleDeleteModal}
                  deleteTask={handleDeleteSection}
                  item={"list"}
                />

                <div className="taskSection-tasks">
                  {filteredTasks.map((task: any, i: any) => {
                    if (
                      search === "" ||
                      task.title.toLowerCase().includes(search.toLowerCase())
                    ) {
                      return (
                        <Task
                          key={task.id}
                          taskData={task}
                          index={i}
                          changeModalDisplay={changeModalDisplay}
                          sectionId={section.id}
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

  Could just set the projectTasks just once when the project first loads

*/
