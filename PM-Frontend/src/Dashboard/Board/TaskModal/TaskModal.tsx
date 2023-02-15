import { useEffect, useState } from "react";
import { TaskProps, User } from "~/shared/interfaces/Projects";
import styles from "./TaskModal.module.scss";

import { Comments, Description, Header, Tags } from ".";

import { useDispatch } from "react-redux";
import { updateTask, deleteTask, setCurrentTask } from "~/ProjectSlice";
import axios from "axios";

type TaskModalProps = {
  user: User;
  modalTask: any;
  members: User[];
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
  const [taskData, setTaskData] = useState<any>(modalTask);
  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCurrentTask(modalTask.id));
  }, [modalTask]);

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

  // deletes the task
  const deleteTaskData = () => {
    dispatch(
      deleteTask({ taskId: modalTask.id, section: taskData.section.data.id })
    );
    toggleDeleteModal();
    closeModal();
    deleteTaskCall();
    async function deleteTaskCall() {
      try {
        const res = await axios.delete(
          `http://localhost:1337/api/tasks/${modalTask.id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  // updates the members assigned to the task
  const updateMembers = async (member: string, add: boolean) => {
    // setTaskData((prevTaskData) => {
    //   return {
    //     ...prevTaskData,
    //     assignedTo: add
    //       ? [...prevTaskData.assignedTo, member]
    //       : prevTaskData.assignedTo.filter(
    //           (memberName: string) => memberName !== member
    //         ),
    //   };
    // });
  };

  // updates the task data based off of user inputs
  const updateTaskData = async <T extends keyof TaskProps>(
    type: T,
    value: TaskProps[T]
  ) => {
    try {
      const res = await axios.put(
        `http://localhost:1337/api/tasks/${modalTask.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            [type]: value,
          },
        }
      );
      console.log(res, "might have worked");
    } catch (err) {
      console.log(err);
    }
  };

  // changes the input data when a new task is selected
  useEffect(() => {
    setTaskData(modalTask.task);
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
            user={user.username}
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
  
  2) Have similar formula for adding and changing things
        - Could pass in all of the things from the task component
        - update the states, but also send api request as things are done

make into one function that takes in the type of change and the data
  send api calls on close 
  1) put - task {
    title: string
    description: string
    dueDate: date
    assignedTo: not sure
    watching: not sure
  }

  send api call as done
  1) post - comment {
    content: string
    task: id (I think)
    project: id (I think)
    users_permissions_user: id (I think)
  }

  or just save everything as it is done



  maybe run an api call when when modal is opened
  set all of the states like in the task component
  
  will also need the api to call when it closes on the task that was changed
  so maybe just do that and pass the data it already has
    could have a state for the task to call again when it closes
*/
