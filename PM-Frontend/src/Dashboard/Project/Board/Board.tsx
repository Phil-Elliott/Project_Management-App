import { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
import styles from "./Board.module.scss";
import { TaskProps } from "~/shared/interfaces/Projects";
import TaskModal from "./TaskModal/TaskModal";
import { Modal } from "~/shared/components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Dashboard/Store";
import {
  addSection,
  addTask,
  switchSectionOrder,
  switchTaskOrder,
} from "../ProjectSlice";

const Board = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<TaskProps>();
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const newData = useSelector((state: RootState) => state.project.project);
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
    setModalTask(newData.tasks.find((task) => task.id === id));
    setDisplay(!display);
  };

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const disableCloseToggle = () => {
    setDisableCloseModal(true);
  };

  // disables ability to close modal when clicked outside of modal (when confirm modal is closed)
  const enableCloseToggle = () => {
    setDisableCloseModal(false);
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
    dispatch(
      switchTaskOrder({
        id: id,
        taskSection: taskSection,
        order: order,
        source: source,
        sourceIndex: sourceIndex,
      })
    );
  };

  useEffect(() => {
    console.log("newData", newData);
    console.log("user", user);
  }, [newData, user]);

  return (
    <div className={styles.main}>
      <Nav />
      <NavOptions members={newData.members} />
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
            disableCloseToggle={disableCloseToggle}
            enableCloseToggle={enableCloseToggle}
          />
        </Modal>
      )}
    </div>
  );
};

export default Board;

/*
  - Add functionanlity to watch bttn
  - Fix ability to only add a member to a task that is part of the board
  - Fix the styles (have some common rules)
  - Add redux




  double modals
  - have a booleon state to confirm if there are two modals
  - If so then dont allow modal to close
  - if not then close modal



  on task click
    - show modal
    - close on escape and outside click (maybe use a hook for this)
        - what did you do for addtask part




         

  Show effect when task is dragged to done (or maybe just add that function to each task section to be chosen)






  6) Create the modal for the elipsis bttn on the taskSedction


  Start cleaning up the code (Its quite messy)


*/
