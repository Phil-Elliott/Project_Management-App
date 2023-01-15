import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import { TaskProps } from "~/shared/interfaces/Projects";
import _ from "lodash";

import Nav from "../Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
import TaskModal from "./TaskModal/TaskModal";
import { Modal } from "~/shared/components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Dashboard/Store";
import {
  addSection,
  addTask,
  switchSectionOrder,
  switchTaskOrder,
} from "~/Dashboard/ProjectSlice";
import { useProject } from "../Nav/ProjectLayout";

const Board = () => {
  const [modalTask, setModalTask] = useState<TaskProps>();
  const [display, setDisplay] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  // const selectedProject = useSelector(
  //   (state: RootState) => state.project.selectedProject
  // );

  const newData = useProject();

  // const emptyData = {
  //   name: "",
  //   id: "",
  //   background: "",
  //   members: [],
  //   notes: [],
  //   tasksSections: [],
  //   tasks: [],
  // };

  // const otherData =
  //   useSelector((state: RootState) =>
  //     state.project.projects.find((project) => project.id === selectedProject)
  //   ) || emptyData;

  const user = useSelector((state: RootState) => state.project.user);
  const dispatch = useDispatch();

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // modal functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // closes modal
  const closeModal = () => {
    setDisplay(false);
  };

  // displays the modal
  const changeModalDisplay = (id: string) => {
    setModalTask(newData!.tasks.find((task) => task.id === id));
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
  const addNewSection = (name: string) => {
    dispatch(addSection(name));
  };

  // adds a new task to the section
  const addNewTask = (name: string, taskSection: string) => {
    dispatch(addTask({ name: name, tasksSection: taskSection }));
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
    const tasksSections = _.cloneDeep(newData!.tasksSections);

    if (sameSection) {
      let tasks = tasksSections.find(
        (section) => section.id === taskSection
      )?.tasks;
      tasks?.splice(sourceIndex, 1)[0];
      tasks?.splice(order, 0, id);
    }

    if (!sameSection) {
      let tasks = tasksSections.find((section) => section.id === source)?.tasks;
      tasks?.splice(sourceIndex, 1)[0];
      tasks = tasksSections.find(
        (section) => section.id === taskSection
      )?.tasks;
      tasks?.splice(order, 0, id);
    }

    dispatch(
      switchTaskOrder({
        taskSections: tasksSections,
      })
    );
  };

  useEffect(() => {
    console.log("newData", newData);
    // console.log("otherData", otherData);
    // console.log("user", user);
  }, [newData, user]);

  return (
    <div className={styles.main}>
      <Nav />
      <NavOptions members={newData!.members} />
      <Tasks
        changeSectionOrder={changeSectionOrder}
        fakeData={newData}
        addNewSection={addNewSection}
        addNewTask={addNewTask}
        changeTaskPosition={changeTaskPosition}
        changeModalDisplay={changeModalDisplay}
      />
      {modalTask && (
        <Modal
          display={display}
          closeModal={closeModal}
          disableCloseModal={disableCloseModal}
        >
          <TaskModal
            user={user}
            modalTask={modalTask}
            members={newData.members}
            display={display}
            closeModal={closeModal}
            toggleDisableCloseModal={toggleDisableCloseModal}
          />
        </Modal>
      )}
    </div>
  );
};

export default Board;

/*
  
  1) Add functionality to search bar
  2) Add functionality to comments
  3) Work on Invite and Filter buttons


  1) Start working on Display page and its styles

  1) Could do a testing tutorial


*/
