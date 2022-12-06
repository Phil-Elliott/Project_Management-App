import React, { useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import "./AddList.scss";

type AddListProps = {
  addNewSection: (name: string) => void;
};

const AddList = ({ addNewSection }: AddListProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addSection = () => {
    addNewSection(inputRef.current!.value);
    toggleForm();
  };

  return (
    <div className="add-task-btn-container">
      <div className="add-task-btn">
        {showForm ? (
          <button className="add-task-btn-add" onClick={() => toggleForm()}>
            <FaPlus className="plus-button" />
            <p>Add another list</p>
          </button>
        ) : (
          <div className="add-task-form">
            <input
              ref={inputRef}
              type="text"
              placeholder="Enter list title..."
              autoFocus
              onClick={() => inputRef.current?.focus()}
            />
            <div className="add-task-form-btns">
              <button
                className="add-task-form-btns-add"
                onClick={() => addSection()}
              >
                Add List
              </button>
              <button
                className="add-task-form-btns-cancel"
                onClick={() => toggleForm()}
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddList;

/*

  1) could have a state that changes the button to a form
  including
    - input field
    - add button
    - cancel button
  


*/
