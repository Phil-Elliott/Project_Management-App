import React from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from "./Header.module.scss";

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
    <div className={styles.main}>
      <div className={styles.left}>
        <input
          className="task-modal-header-input"
          value={taskData.name}
          onChange={(e) => changeName(e.target.value)}
        />
      </div>
      <div className={styles.right}>
        <FaRegTrashAlt
          className={styles.icon}
          onClick={() => toggleDeleteModal()}
        />
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
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
