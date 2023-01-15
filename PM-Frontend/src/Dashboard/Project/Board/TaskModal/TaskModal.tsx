import { useEffect, useState } from "react";
import { TaskProps, User } from "~/shared/interfaces/Projects";
import styles from "./TaskModal.module.scss";

import Header from "./Header/Header";
import Tags from "./Tags/Tags";
import Description from "./Description/Description";
import Comments from "./Comments/Comments";

import { useDispatch } from "react-redux";
import { updateTask, deleteTask } from "~/Dashboard/ProjectSlice";

type TaskModalProps = {
  user: User;
  modalTask: any;
  members: string[];
  display: boolean;
  closeModal: () => void;
  toggleDisableCloseModal: (disable: boolean) => void;
};

const TaskModal = ({
  user,
  modalTask,
  members,
  display,
  closeModal,
  toggleDisableCloseModal,
}: TaskModalProps) => {
  const [taskData, setTaskData] = useState<TaskProps>(modalTask);
  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);

  const dispatch = useDispatch();

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

  // deletes the task
  const deleteTaskData = () => {
    dispatch(deleteTask(taskData.id));
    toggleDeleteModal();
    closeModal();
  };

  // updates the members assigned to the task
  const updateMembers = (member: string, add: boolean) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        assignedTo: add
          ? [...prevTaskData.assignedTo, member]
          : prevTaskData.assignedTo.filter(
              (memberName: string) => memberName !== member
            ),
      };
    });
  };

  // updates the task data based off of user inputs
  const updateTaskData = <T extends keyof TaskProps>(
    type: T,
    value: TaskProps[T]
  ) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        [type]: value,
      };
    });
  };

  // changes the input data when a new task is selected
  useEffect(() => {
    setTaskData(modalTask);
  }, [modalTask]);

  // saves the changes to the task when the modal is closed
  useEffect(() => {
    dispatch(updateTask(taskData));
  }, [display]);

  return (
    <div className={styles.main}>
      <Header
        taskData={taskData}
        toggleDeleteModal={toggleDeleteModal}
        closeModal={closeModal}
        displayConfirm={displayConfirm}
        deleteTask={deleteTaskData}
        updateTaskData={updateTaskData}
      />
      <div className={styles.body}>
        <div className={styles.right}>
          <Description
            descriptionData={taskData.description}
            updateTaskData={updateTaskData}
          />
          <Comments
            taskData={taskData}
            updateTaskData={updateTaskData}
            user={user.name}
            display={display}
          />
        </div>
        <div className={styles.left}>
          <Tags
            user={user}
            taskData={taskData}
            members={members}
            updateMembers={updateMembers}
            updateTaskData={updateTaskData}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

/*
 

*/
