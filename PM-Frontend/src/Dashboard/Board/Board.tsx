import { useEffect, useState } from "react";
import styles from "./Board.module.scss";

import { TaskProps } from "~/shared/interfaces/Projects";
import _ from "lodash";

import { NavOptions, TaskModal, Tasks, useProject } from ".";
import { Modal } from "~/shared/components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  addSection,
  addTask,
  switchSectionOrder,
  switchTaskOrder,
} from "~/ProjectSlice";
import axios from "axios";

const Board = () => {
  const [modalTask, setModalTask] = useState<any>();
  const [display, setDisplay] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const newData = useSelector((state: RootState) => state.project.project);
  const user = useSelector((state: RootState) => state.project.user);
  const users = useSelector((state: RootState) => state.project.projectUsers);
  const sections = useSelector((state: RootState) => state.project.sections);
  const dispatch = useDispatch();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // modal functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // closes modal
  const closeModal = () => {
    setDisplay(false);
  };

  // displays the modal
  const changeModalDisplay = (task: any, id: string) => {
    setModalTask({ task, id });
    setDisplay(!display);
  };

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const toggleDisableCloseModal = (disable: boolean) => {
    setDisableCloseModal(disable);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // section functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // adds a new section to the data - triggered by addList btn
  const addNewSection = async (name: string, orderedArr: number[]) => {
    // adds the new section to the database
    try {
      const res = await axios.post(`http://localhost:1337/api/sections`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        data: {
          title: name,
          order: 1,
          project: newData!.id,
        },
      });
      orderedArr.push(res.data.data.id);
      addSectionOrder();
      dispatch(
        addSection({
          id: res.data.data.id,
          title: res.data.data.attributes.title,
          order: res.data.data.attributes.order,
        })
      );
    } catch (err) {
      console.log(err);
    }
    async function addSectionOrder() {
      try {
        const res = await axios.put(
          `http://localhost:1337/api/projects/${newData!.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            data: {
              ordered_sections: orderedArr,
            },
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // adds a new task to the section
  const addNewTask = async (
    name: string,
    taskSection: string,
    orderedArr: number[]
  ) => {
    // adds the new task to the database
    try {
      const res = await axios.post(`http://localhost:1337/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        data: {
          title: name,
          section: taskSection,
          order: 1,
          project: newData!.id,
        },
      });
      orderedArr.push(res.data.data.id);
      addTaskOrder();
      dispatch(
        addTask({
          name: "test",
          tasksSection: "to-do",
        })
      );
    } catch (err) {
      console.log(err);
    }

    // adds the new task to the ordered tasks array inside of sections
    async function addTaskOrder() {
      try {
        const res = await axios.put(
          `http://localhost:1337/api/sections/${taskSection}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
            data: {
              ordered_tasks: orderedArr,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // drag and drop functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // changes the order of the sections
  const changeSectionOrder = (id: string, order: number, source: number) => {
    dispatch(switchSectionOrder({ id: id, order: order, source: source }));
  };

  // changes the task section and order within the task object - triggered by drag and drop

  const changeTaskPosition = (
    id: string,
    taskSection: string,
    order: number,
    source: string,
    sourceIndex: number
  ) => {
    const sameSection = taskSection === source;
    // const tasksSections = _.cloneDeep(newData!.tasksSections);

    // if (sameSection) {
    //   let tasks = tasksSections.find(
    //     (section) => section.id === taskSection
    //   )?.tasks;
    //   tasks?.splice(sourceIndex, 1)[0];
    //   tasks?.splice(order, 0, id);
    // }

    // if (!sameSection) {
    //   let tasks = tasksSections.find((section) => section.id === source)?.tasks;
    //   tasks?.splice(sourceIndex, 1)[0];
    //   tasks = tasksSections.find(
    //     (section) => section.id === taskSection
    //   )?.tasks;
    //   tasks?.splice(order, 0, id);
    // }

    // dispatch(
    //   switchTaskOrder({
    //     taskSections: tasksSections,
    //   })
    // );
  };

  return (
    <div
      className={styles.main}
      style={{
        backgroundImage: `url(${newData.background})`,
        backgroundColor: newData.background,
      }}
    >
      <NavOptions members={users} />
      <Tasks
        changeSectionOrder={changeSectionOrder}
        fakeData={newData}
        sections={sections}
        addNewSection={addNewSection}
        addNewTask={addNewTask}
        changeTaskPosition={changeTaskPosition}
        changeModalDisplay={changeModalDisplay}
      />
      {/* {modalTask && (
        <Modal
          display={display}
          closeModal={closeModal}
          disableCloseModal={disableCloseModal}
        >
          <TaskModal
            user={user}
            modalTask={modalTask}
            members={users}
            display={display}
            closeModal={closeModal}
            toggleDisableCloseModal={toggleDisableCloseModal}
          />
        </Modal>
      )} */}
    </div>
  );
};

export default Board;

/*
  Move a section 
  Move a task


  1) Make api calls and store data from api calls in redux store

  Maybe pass basic project data from outlet using that find method and then make api calls in the board component


  1) Get modal working 
  2) Get drag and drop working
  3) Have data on database change
  4) Add a profile page
  5) Fix styles 
  6) Test


  
  
  4) Work on changing that order when a section is moved
    - First make sure the drag is working on the individual sections and tasks
    - Then fix up the function to change the order of the sections (changeSectionOrder)
  5) Work on changing the order of the tasks when a task is moved
      - fix up the function to change the order of the sections (changeTaskPosition)
  6) Delete the order part of the task and section objects



*/
