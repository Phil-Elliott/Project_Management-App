import { useEffect, useState } from "react";
import { TaskProps, User } from "../../../../Interfaces";
import Header from "./Header/Header";
import Tags from "./Tags/Tags";
import styles from "./TaskModal.module.scss";
import Description from "./Description/Description";
import Comments from "./Comments/Comments";

type TaskModalProps = {
  user: User;
  modalTask: any;
  members: string[];
  changeTaskData: (data: TaskProps) => void;
  display: boolean;
  deleteTaskData: (id: string) => void;
  closeModal: () => void;
  disableCloseToggle: () => void;
  enableCloseToggle: () => void;
  addWatching: (id: string) => void;
  removeWatching: (id: string) => void;
};

const TaskModal = ({
  user,
  modalTask,
  members,
  changeTaskData,
  display,
  deleteTaskData,
  closeModal,
  disableCloseToggle,
  enableCloseToggle,
  addWatching,
  removeWatching,
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

  // deletes the task
  const deleteTask = () => {
    deleteTaskData(taskData.id);
    closeConfirmModal();
    closeModal();
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

  // adds a new member to the task
  const addNewMember = (member: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        assignedTo: [...prevTaskData.assignedTo, member],
      };
    });
  };

  // removes a member from the task
  const removeMember = (member: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        assignedTo: prevTaskData.assignedTo.filter(
          (memberName: string) => memberName !== member
        ),
      };
    });
  };

  // changes the priority of the task
  const changePriority = (value: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        priority: value,
      };
    });
  };

  // changes the description of the task
  const changeDescription = (value: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        description: value,
      };
    });
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
    <div className={styles.main}>
      <Header
        taskData={taskData}
        changeName={changeName}
        toggleDeleteModal={toggleDeleteModal}
        closeModal={closeModal}
        displayConfirm={displayConfirm}
        closeConfirmModal={closeConfirmModal}
        deleteTask={deleteTask}
      />
      <div className={styles.body}>
        <div className={styles.right}>
          <Description
            descriptionData={taskData.description}
            changeDescription={changeDescription}
          />
          <Comments taskData={taskData} />
        </div>
        <div className={styles.left}>
          <Tags
            user={user}
            taskData={taskData}
            members={members}
            addNewMember={addNewMember}
            removeMember={removeMember}
            addWatching={addWatching}
            removeWatching={removeWatching}
            changePriority={changePriority}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

/*
  - main 
  - right 
  - left






   input 
    - set value to task name
    - on change, set the task name to the value



Create a modal for the task (when click)
    - Top (same as trello - name, section, trashcan and x on right)
    - Two rows
          - top (left to right)
              - assigned to (same as trello)
              - watch button (same as trello)
              - priority (same as jira clone) - dropdown
              - due date (same as trello)  
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



Extra for later
- could show created and updated date
- activity (that records everything)

*/
