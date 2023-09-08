import { useEffect, useState } from "react";
import { User } from "~/shared/interfaces/Projects";
import styles from "./TaskModal.module.scss";

import { Comments, Description, Header, Tags } from ".";

import { useDispatch, useSelector } from "react-redux";
import { updateTask, deleteTask, setCurrentTask } from "~/ProjectSlice";
import axios from "axios";
import { Loader } from "~/shared/components";

type TaskModalProps = {
  user: User;
  modalTask: any;
  members: User[];
  display: boolean;
  closeModal: () => void;
  toggleDisableCloseModal: (disable: boolean) => void;
};

export type TaskDataProps = {
  id: string;
  title: string;
  description: string;
  priority: string;
  due: string;
  assigned_users: number[];
  watching_users: number[];
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
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setTaskData(modalTask);
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  }, [modalTask]);

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
      deleteTask({ taskId: modalTask.id, section: modalTask.sectionId })
    );
    toggleDeleteModal();
    closeModal();
    deleteTaskCall();
    async function deleteTaskCall() {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/v1/tasks/${modalTask.id}`,
          { withCredentials: true }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // updates the task data based off of user inputs
  const updateTaskData = async <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => {
    const payload = {
      [type]: value,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/tasks/${modalTask.id}`,
        payload,
        { withCredentials: true }
      );

      if (
        type === "title" ||
        type === "watching_users" ||
        type === "assigned_users" ||
        type === "priority" ||
        type === "due"
      ) {
        let newType: string = type;
        if (type === "watching_users") {
          newType = "watching";
        } else if (type === "assigned_users") {
          newType = "assigned";
        }

        dispatch(
          updateTask({
            section: modalTask.sectionId,
            taskId: modalTask.id,
            type: newType,
            value: value,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  // updates comments data when something is done in comments
  async function fetchTask() {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/tasks/${modalTask.id}`,
        { withCredentials: true }
      );

      console.log(res, "task modal comments changed");
      setTaskData(res.data.data.attributes);
    } catch (err) {
      console.log(err);
    }
  }

  // changes the input data when a new task is selected
  useEffect(() => {
    setTaskData(modalTask.task);
  }, [modalTask]);

  // // saves the changes to the task when the modal is closed
  // useEffect(() => {
  //   dispatch(updateTask(taskData));
  // }, [display]);

  return (
    <>
      <div
        className={styles.main}
        style={loading ? { display: "" } : { display: "none" }}
      >
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
              descriptionData={taskData?.description}
              updateTaskData={updateTaskData}
              task={taskData}
            />
            <Comments
              taskData={taskData}
              updateTaskData={updateTaskData}
              user={user}
              display={display}
              id={modalTask.id}
              fetchTask={fetchTask}
            />
          </div>
          <div className={styles.left}>
            <Tags
              user={user}
              taskData={taskData}
              members={members}
              updateTaskData={updateTaskData}
            />
          </div>
        </div>
      </div>
      {!loading && (
        <div className={styles["loader-container"]}>
          <Loader size={300} />
        </div>
      )}
    </>
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
