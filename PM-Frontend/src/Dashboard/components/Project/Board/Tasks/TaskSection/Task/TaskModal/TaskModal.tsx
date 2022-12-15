import React, { useEffect, useState } from "react";
import { FaTimes, FaRegTrashAlt } from "react-icons/fa";
import { TaskProps } from "../../../../Interfaces";
import "./TaskModal.scss";

type TaskModalProps = {
  modalTask: any;
  changeTaskData: (data: TaskProps) => void;
  display: boolean;
};

const TaskModal = ({ modalTask, changeTaskData, display }: TaskModalProps) => {
  const [taskData, setTaskData] = useState<TaskProps>(modalTask);

  // changes the input data and saves changes to task when the input is changed
  const changeName = (value: string) => {
    setTaskData((prevTaskData) => {
      return {
        ...prevTaskData,
        name: value,
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
          <FaRegTrashAlt className="task-modal-header-icon" />
          <FaTimes className="task-modal-header-icon" />
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
