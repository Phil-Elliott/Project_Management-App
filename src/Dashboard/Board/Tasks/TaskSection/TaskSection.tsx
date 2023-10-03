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

import moment from "moment";

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

  // check to see if any filters have been applied
  function checkFilter(filter: any) {
    return (
      Object.values(filter).some((value: any) => value === true) ||
      filter.assignedToUsers.length > 0
    );
  }

  useEffect(() => {
    if (filterData) {
      getFilteredTasks();
    }
  }, [projectTasks, filterData]);

  function getFilteredTasks() {
    function isPastDate(date: string) {
      if (!date) return false;
      const today = moment().startOf("day");
      return moment(date).isBefore(today);
    }
    function isNextDay(date: string) {
      if (!date) return false;
      const today = moment().startOf("day");
      const tomorrow = moment().startOf("day").add(1, "days");
      return (
        moment(date).isSameOrAfter(today) && moment(date).isBefore(tomorrow)
      );
    }
    function isNextWeek(date: string) {
      if (!date) return false;
      const today = moment().startOf("day");
      const nextWeek = moment().startOf("day").add(7, "days");
      return (
        moment(date).isSameOrAfter(today) && moment(date).isBefore(nextWeek)
      );
    }
    function isNextMonth(date: string) {
      if (!date) return false;
      const today = moment().startOf("day");
      const nextMonth = moment().startOf("day").add(1, "months");
      return (
        moment(date).isSameOrAfter(today) && moment(date).isBefore(nextMonth)
      );
    }

    const checkExact = (task: TaskProps) => {
      if (
        filterData.watching &&
        task.watching.filter(
          (userWatching: any) => userWatching._id === user.id
        ).length === 0
      ) {
        return false;
      }

      if (filterData.noMembers && task.assigned.length > 0) {
        return false;
      }
      if (
        filterData.assignedToMe &&
        task.assigned.filter((userAssigned: any) => userAssigned.id === user.id)
          .length === 0
      ) {
        return false;
      }

      if (
        filterData.assignedToUsers.length > 0 &&
        !filterData.assignedToUsers.every((userId) =>
          task.assigned.some((userAssigned: any) => userAssigned.id === userId)
        )
      ) {
        return false;
      }

      if (filterData.noDates && task.due !== undefined) {
        return false;
      }

      if (filterData.overdue && !isPastDate(task.due)) {
        return false;
      }

      if (filterData.nextDay && !isNextDay(task.due)) {
        return false;
      }
      if (filterData.nextWeek && !isNextWeek(task.due)) {
        return false;
      }
      if (filterData.nextMonth && !isNextMonth(task.due)) {
        return false;
      }
      if (filterData.urgent && task.priority !== "Urgent") {
        return false;
      }
      if (filterData.high && task.priority !== "High") {
        return false;
      }
      if (filterData.normal && task.priority !== "Normal") {
        return false;
      }
      if (filterData.low && task.priority !== "Low") {
        return false;
      }
      return true;
    };

    const checkNotExact = (task: TaskProps) => {
      if (!checkFilter(filterData)) {
        return true;
      }

      if (
        filterData.watching &&
        task.watching.filter(
          (userWatching: any) => userWatching._id === user.id
        ).length === 1
      ) {
        return true;
      }

      if (filterData.noMembers && task.assigned.length === 0) {
        return true;
      }
      if (
        filterData.assignedToMe &&
        task.assigned.filter((userAssigned: any) => userAssigned.id === user.id)
          .length !== 0
      ) {
        return true;
      }

      if (
        filterData.assignedToUsers.length > 0 &&
        task.assigned.filter((userAssigned: any) =>
          filterData.assignedToUsers.includes(userAssigned.id)
        ).length !== 0
      ) {
        return true;
      }

      if (filterData.noDates && task.due === undefined) {
        return true;
      }

      if (filterData.overdue && isPastDate(task.due)) {
        return true;
      }

      if (filterData.nextDay && isNextDay(task.due)) {
        return true;
      }
      if (filterData.nextWeek && isNextWeek(task.due)) {
        return true;
      }
      if (filterData.nextMonth && isNextMonth(task.due)) {
        return true;
      }
      if (filterData.urgent && task.priority === "Urgent") {
        return true;
      }
      if (filterData.high && task.priority === "High") {
        return true;
      }
      if (filterData.normal && task.priority === "Normal") {
        return true;
      }
      if (filterData.low && task.priority === "Low") {
        return true;
      }
      return false;
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
        `https://pm-server-production.up.railway.app/api/v1/sections/${section.id}`,
        { withCredentials: true }
      );

      dispatch(
        setSections(
          sections.filter((s: TasksSections) => {
            return s.id !== section.id;
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
        `https://pm-server-production.up.railway.app/api/v1/tasks/section/${section.id}`,
        { withCredentials: true }
      );
      setTasks(
        res.data.data.tasks.map((task: any) => {
          return {
            id: task._id,
            title: task.title,
            description: task.description,
            due: task.due,
            priority: task.priority,
            order: task.order,
            comments: [],
            watching: [],
            assigned: [],
          };
        })
      );
      // Gets an array of the order of the tasks by id
      setOrderedArr(
        res.data.data.tasks.map((task: any) => {
          return task._id;
        })
      );
    } catch (err: any) {
      console.log(err);
    }
  }

  // updates the title of the task section
  async function updateSectionTitle() {
    if (titleValue === section.title) return;
    if (!titleValue || titleValue === "") return;

    const payload = {
      title: titleValue,
    };

    try {
      const res = await axios.patch(
        `https://pm-server-production.up.railway.app/api/v1/sections/${section.id}`,
        payload,
        { withCredentials: true }
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
                  {!checkFilter(filterData)
                    ? projectTasks[index]?.tasks.map((task: any, i: any) => {
                        if (
                          search === "" ||
                          task.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
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
                      })
                    : filteredTasks.map((task: any, i: any) => {
                        if (
                          search === "" ||
                          task.title
                            .toLowerCase()
                            .includes(search.toLowerCase())
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


  Could have a filter array that only displays when something is true in the filterdata

  */
