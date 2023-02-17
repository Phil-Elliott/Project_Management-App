import React, { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";

import styles from "./Header.module.scss";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { TiThLarge } from "react-icons/ti";

import { TaskProps } from "~/shared/interfaces/Projects";

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
        <textarea
          rows={1}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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

/*
   use a debounce or an outside click to update api

*/
