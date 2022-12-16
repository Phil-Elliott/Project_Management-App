import React from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import "./Header.scss";

type HeaderProps = {
  taskData: any;
  changeName: (value: string) => void;
  toggleDeleteModal: () => void;
  closeModal: () => void;
  displayConfirm: boolean;
  closeConfirmModal: () => void;
  deleteTask: () => void;
};

const Header = ({
  taskData,
  changeName,
  toggleDeleteModal,
  closeModal,
  displayConfirm,
  closeConfirmModal,
  deleteTask,
}: HeaderProps) => {
  return (
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
  );
};

export default Header;
