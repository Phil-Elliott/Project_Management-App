import React from "react";
import "./Tags.scss";
import { Members } from "../../../../../NavOptions";
import { FaPlus, FaEye } from "react-icons/fa";

type TagsProps = {
  taskData: any;
  addNewMember: (member: string) => void;
};

const Tags = ({ taskData, addNewMember }: TagsProps) => {
  return (
    <div className="task-modal-tags">
      <div className="task-modal-members">
        <p>Members</p>
        <div className="task-modal-members-content">
          <Members members={taskData.assignedTo} />
          <FaPlus
            className="task-modal-add-members-icon"
            onClick={() => addNewMember("newMember")}
          />
        </div>
      </div>
      <div className="task-modal-watch">
        <p>Notifications</p>
        <div className="task-modal-watch-content">
          <FaEye />
          <p>Watch</p>
        </div>
      </div>
      <div className="task-modal-priority">
        <p>Priority</p>
        <div className="task-modal-priority-content">
          <p>Normal</p>
        </div>
      </div>
      <div className="task-modal-due-date">
        <p>Due Date</p>
        <div className="task-modal-due-date-content">
          <p>None</p>
        </div>
      </div>
    </div>
  );
};

export default Tags;
