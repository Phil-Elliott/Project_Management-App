import React from "react";
import { FaEllipsisH, FaPlus } from "react-icons/fa";
import "./AddList.scss";

const AddList = () => {
  return (
    <div className="add-task-btn-container">
      <div className="add-task-btn">
        <button className="add-task-btn">
          <FaPlus className="plus-button" />
          <p>Add another list</p>
        </button>
      </div>
    </div>
  );
};

export default AddList;
