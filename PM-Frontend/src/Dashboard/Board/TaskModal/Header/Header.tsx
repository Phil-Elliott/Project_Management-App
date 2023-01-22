import React from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { TaskProps } from "~/shared/interfaces/Projects";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import styles from "./Header.module.scss";
import { TiThLarge } from "react-icons/ti";

type HeaderProps = {
  taskData: any;
  toggleDeleteModal: () => void;
  closeModal: () => void;
  displayConfirm: boolean;
  deleteTask: () => void;
  updateTaskData: (key: keyof TaskProps, value: any) => void;
};

const Header = ({
  taskData,
  toggleDeleteModal,
  closeModal,
  displayConfirm,
  deleteTask,
  updateTaskData,
}: HeaderProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.left}>
        <TiThLarge className={styles.icon} />
        <textarea
          rows={1}
          value={taskData.name}
          onChange={(e) => updateTaskData("name", e.target.value)}
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
          closeModal={toggleDeleteModal}
          deleteTask={deleteTask}
        />
      </div>
    </div>
  );
};

export default Header;
