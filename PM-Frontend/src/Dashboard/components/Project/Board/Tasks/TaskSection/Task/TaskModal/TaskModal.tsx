import React, { useEffect, useState } from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import Modal from "../../../../Components/Modal/Modal";
import { TaskProps } from "../../../../Interfaces";
import ConfirmModal from "./ConfirmModal/ConfirmModal";
import "./TaskModal.scss";

type TaskModalProps = {
  modalTask: any;
  changeTaskData: (data: TaskProps) => void;
  display: boolean;
  deleteTaskData: (id: string) => void;
  closeModal: () => void;
  disableCloseToggle: () => void;
  enableCloseToggle: () => void;
};

const TaskModal = ({
  modalTask,
  changeTaskData,
  display,
  deleteTaskData,
  closeModal,
  disableCloseToggle,
  enableCloseToggle,
}: TaskModalProps) => {
  const [taskData, setTaskData] = useState<TaskProps>(modalTask);
  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(true);
    disableCloseToggle();
  };

  // closes confirm modal
  const closeConfirmModal = () => {
    setDisplayConfirm(false);
    enableCloseToggle();
  };

  // changes the name of the task
  const changeName = (value: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        name: value,
      };
    });
  };

  // deletes the task
  const deleteTask = () => {
    deleteTaskData(taskData.id);
    closeConfirmModal();
    closeModal();
  };

  // changes the input data when a new task is selected
  useEffect(() => {
    setTaskData(modalTask);
  }, [modalTask]);

  // saves the changes to the task when the modal is closed
  useEffect(() => {
    changeTaskData(taskData);
  }, [display]);

  return (
    <div className="task-modal-container">
      <div className="task-modal-header">
        <div className="task-modal-header-left">
          <input
            className="task-modal-header-input"
            value={taskData.name}
            onChange={(e) => changeName(e.target.value)}
          />
        </div>
        <div className="task-modal-header-right">
          <FaRegTrashAlt
            className="task-modal-header-icon"
            onClick={() => toggleDeleteModal()}
          />
          <FaTimes
            className="task-modal-header-icon"
            onClick={() => closeModal()}
          />
          <ConfirmModal
            display={displayConfirm}
            closeModal={closeConfirmModal}
            deleteTask={deleteTask}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

/*
   input 
    - set value to task name
    - on change, set the task name to the value



Create a modal for the task (when click)
    - Top (same as trello - name, section, trashcan and x on right)
    - Two rows
          - top
              - assigned to (same as jira clone)
              - priority (same as jira clone)
              - watch button
              - due date
              - could show created and updated date
         - bottom
              - description (try to get the same as the jira clone)
              - comments (same as jira clone)


- Should be able to change task name
     - make the task name an input
     - use an onchange to change the task name
     - add a debounce method?
- Have the trashcan delete the task on click
    - have another popup to confirm

- figure out react portals

*/
