import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

import styles from "./Header.module.scss";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { TiThLarge } from "react-icons/ti";

import { TaskDataProps } from "../TaskModal";
import ConfirmModal from "~/shared/components/ConfirmModal/ConfirmModal";

type HeaderProps = {
  taskData: any;
  toggleDeleteModal: () => void;
  closeModal: () => void;
  displayConfirm: boolean;
  deleteTask: () => void;
  updateTaskData: (key: keyof TaskDataProps, value: any) => void;
};

const Header = ({
  taskData,
  toggleDeleteModal,
  closeModal,
  displayConfirm,
  deleteTask,
  updateTaskData,
}: HeaderProps) => {
  const [title, setTitle] = useState<string>("");
  const debouncedValue = useDebounce<string>(title, 1000);

  useEffect(() => {
    setTitle(taskData.title);
  }, [taskData]);

  useEffect(() => {
    updateTaskData("title", title);
  }, [debouncedValue]);

  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <TiThLarge className={styles.icon} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className={styles.right}>
        <FaRegTrashAlt
          className={styles.icon}
          onClick={() => toggleDeleteModal()}
        />
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
        <ConfirmModal
          display={displayConfirm}
          closeModal={toggleDeleteModal}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Header;

/*
   use a debounce or an outside click to update api






   @use "~/styles" as *;

.taskSection-container {
  background-color: #f4f5f7;
  border-radius: 3px;
  padding: 0.75rem 0.75rem;
  margin-right: 1rem;
  height: 100%;
  box-shadow: $box-shadow-light;
  position: relative;
}

.taskSection-header {
  @extend %flex-between;
  align-items: center;
  font-weight: 600;
  font-size: 0.9rem;

  input {
    width: 100%;
    border: none;
    outline: none;
    font-size: 0.9rem;
    font-weight: 600;
    padding: 0;
    background-color: #f4f5f7;
  }

  .ellipsis-container {
    cursor: pointer;
    color: $primary-dark;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    height: 100%;
    border-radius: 3px;

    &:hover {
      background-color: $primary-light;
    }
  }
}

// .popup-container {
// }



*/

// import React, { useState, useEffect, useMemo, useCallback } from "react";
// import { Droppable, Draggable } from "react-beautiful-dnd";
// import Task from "./Task/Task";
// import styles from "./TaskSection.module.scss";
// import { FaEllipsisH, FaTimes } from "react-icons/fa";

// import { AddItem, Popup } from "~/shared/components";
// import { useDebounce } from "usehooks-ts";

// import { useDispatch, useSelector } from "react-redux";
// import { RootState } from "~/Store";
// import {
//   ProjectDataProps,
//   TaskProps,
//   TasksSections,
// } from "~/shared/interfaces/Projects";
// import axios from "axios";
// import { setOrderedTasks, setProjectTasks } from "~/ProjectSlice";

// type TaskSectionProps = {
//   section: TasksSections;
//   addNewTask: (name: string, section: string, orderArr: number[]) => void;
//   index: number;
//   changeModalDisplay: (task: any, id: string) => void;
// };

// const TaskSection = ({
//   section,
//   addNewTask,
//   index,
//   changeModalDisplay,
// }: TaskSectionProps) => {
//   const [tasks, setTasks] = useState<TaskProps[]>([]);
//   const [orderedArr, setOrderedArr] = useState<number[]>([]);
//   const [displayPopup, setDisplayPopup] = useState<boolean>(false);
//   const [titleValue, setTitleValue] = useState<string>("");
//   const debouncedValue = useDebounce<string>(titleValue, 1000);

//   useEffect(() => {
//     setTitleValue(section.title);
//   }, [section]);

//   useEffect(() => {
//     updateSectionTitle();
//   }, [debouncedValue]);

//   const projectTasks = useSelector(
//     (state: RootState) => state.project.projectTasks
//   );
//   const search = useSelector((state: RootState) => state.project.searchQuery);

//   const dispatch = useDispatch();

//   // gets all of the tasks on render
//   async function fetchTasks() {
//     try {
//       const res = await axios.get(
//         `http://localhost:1337/api/sections/${section.id}?populate=ordered_tasks`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//         }
//       );
//       // setTasks(res.data.data.attributes.tasks.data);

//       setTasks(
//         res.data.data.attributes.ordered_tasks.data.map((task: any) => {
//           return {
//             id: task.id,
//             title: task.attributes.title,
//             description: task.attributes.description,
//             due: task.attributes.due,
//             priority: task.attributes.priority,
//             order: task.attributes.order,
//           };
//         })
//       );
//       // Gets an array of the order of the tasks by id
//       setOrderedArr(
//         res.data.data.attributes.ordered_tasks.data.map((task: any) => {
//           return task.id;
//         })
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // updates the title of the task section
//   async function updateSectionTitle() {
//     if (titleValue === section.title) return;
//     if (!titleValue || titleValue === "") return;
//     try {
//       const res = await axios.put(
//         `http://localhost:1337/api/sections/${section.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//           },
//           data: {
//             title: titleValue,
//           },
//         }
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const toggleDisplayPopup = () => {
//     setDisplayPopup(!displayPopup);
//   };

//   useEffect(() => {
//     fetchTasks();
//   }, [section]);

//   useEffect(() => {
//     dispatch(
//       setOrderedTasks({ section: section.id.toString(), tasks: orderedArr })
//     );
//   }, [orderedArr]);

//   useEffect(() => {
//     dispatch(setProjectTasks({ tasks: tasks, section: section.id.toString() }));
//   }, [tasks]);

//   return (
//     <Draggable
//       draggableId={`s${section.id.toString()}`}
//       index={index}
//       key={section.id}
//     >
//       {(provided) => (
//         <div
//           className={styles["taskSection-container"]}
//           {...provided.draggableProps}
//           {...provided.dragHandleProps}
//           ref={provided.innerRef}
//         >
//           <Droppable
//             droppableId={`s${section.id.toString()}`}
//             type="droppable-item"
//           >
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 <div className={styles["taskSection-header"]}>
//                   {/* <p>{section.title}</p> */}
//                   <input
//                     type="text"
//                     value={titleValue}
//                     onChange={(e) => setTitleValue(e.target.value)}
//                   />
//                   <div className={styles["ellipsis-container"]}>
//                     <FaEllipsisH
//                       className={styles.ellipsis}
//                       onClick={() => toggleDisplayPopup()}
//                     />
//                   </div>
//                 </div>
//                 {displayPopup && (
//                   <Popup close={() => setDisplayPopup(!displayPopup)}>
//                     <div className={styles["popup-container"]}>
//                       <div className={styles["pupup-header"]}>
//                         <h3>List Options</h3>
//                         <FaTimes onClick={() => setDisplayPopup(false)} />
//                       </div>
//                       <div className={styles["popup-content"]}>
//                         <div className={styles["popup-item"]}>
//                           <p>Rename List</p>
//                         </div>
//                         <div className={styles["popup-item"]}>
//                           <p>Delete List</p>
//                         </div>
//                       </div>
//                     </div>
//                   </Popup>
//                 )}

//                 <div className="taskSection-tasks">
//                   {projectTasks[index] &&
//                     projectTasks[index].tasks.map((task, index) => {
//                       if (
//                         search === "" ||
//                         task.title.toLowerCase().includes(search.toLowerCase())
//                       ) {
//                         return (
//                           <Task
//                             key={task.id}
//                             taskData={task}
//                             index={index}
//                             changeModalDisplay={changeModalDisplay}
//                           />
//                         );
//                       }
//                     })}
//                   {provided.placeholder}
//                 </div>
//               </div>
//             )}
//           </Droppable>
//           <AddItem
//             addNewItem={addNewTask}
//             item={"task"}
//             section={section.id}
//             orderedArr={orderedArr}
//           />
//         </div>
//       )}
//     </Draggable>
//   );
// };

// export default TaskSection;

/*

  Elipsis
     1) Rename Section (Maybe just click on it to rename) and rename button does it for you
     2) Delete Section
    //  3) Sort Section
    //  4) Watch Section



*/
