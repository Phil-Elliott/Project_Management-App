import React, { useState, useEffect } from "react";
import { projectData } from "../../../../Interfaces";
import "./../ModalAddProject/ModalAddProject.scss";

const ModalAddProject = ({
  displayEditProjectModal,
  changeDisplayEditProjectModal,
  editProject,
  projectData,
  deleteProject,
}: {
  displayEditProjectModal: boolean;
  changeDisplayEditProjectModal: any;
  editProject: any;
  projectData: any;
  deleteProject: any;
}) => {
  const [inputData, setInputData] = useState<projectData>({
    name: "",
    id: "",
    initials: "",
    color: "",
    description: "",
    launch: "",
    tasks: [],
    completed: [],
  });

  const addTheProject = () => {
    if (
      inputData.name &&
      inputData.initials &&
      inputData.color &&
      inputData.description &&
      inputData.launch
    ) {
      editProject(inputData, projectData.name);
    } else {
      alert("Please fill out all fields");
    }
  };

  const change = (e: any, init?: boolean) => {
    if (init) {
      if (e.initials.length < 3) {
        setInputData(e);
      }
    } else {
      setInputData(e);
    }
  };

  useEffect(() => {
    setInputData({
      name: projectData.name,
      id: projectData.id,
      initials: projectData.initials,
      color: "#5ec99c",
      description: projectData.description,
      launch: projectData.launch,
      tasks: projectData.tasks,
      completed: projectData.completed,
    });
  }, [displayEditProjectModal]);

  // Allows ESC key to only be used to close
  const closeOnEscapeKeyDown = (e: any) => {
    if ((e.charCode || e.keyCode) === 27) {
      changeDisplayEditProjectModal();
    }
  };

  // Allows for enter key to save details
  const saveOnEnterKeyDown = (e: any) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      addTheProject();
    }
  };

  // Allows access to use keys only when modal is displayed
  useEffect(() => {
    if (displayEditProjectModal === true) {
      document.body.addEventListener("keydown", closeOnEscapeKeyDown);
      document.body.addEventListener("keydown", saveOnEnterKeyDown);
    }
  }, [displayEditProjectModal]);

  return (
    <div
      className={`modal ${displayEditProjectModal ? "show" : ""}`}
      onClick={changeDisplayEditProjectModal}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">Edit Project</h1>
        </div>
        <div className="modalAdd-body">
          <div className="modal-add-projectName">
            <div
              className="nav-logo-addProject"
              style={{ backgroundColor: inputData.color }}
            >
              <p>{inputData.initials}</p>
            </div>
            <input
              type="text"
              name="project-name"
              placeholder="Project Name"
              value={inputData.name}
              onChange={(e) => change({ ...inputData, name: e.target.value })}
              className="project-name-input"
            />
          </div>
          <div className="modal-add-logo-details">
            <div className="logo-initials">
              <p>Initials</p>
              <input
                type="text"
                name="project-logo initials"
                placeholder="Logo Initials"
                value={inputData.initials}
                onChange={(e) =>
                  change({ ...inputData, initials: e.target.value }, true)
                }
              />
            </div>
            <div className="logo-color">
              <p>Color</p>
              <select
                defaultValue="#5ec99c"
                name="logo color"
                onChange={(e) =>
                  change({ ...inputData, color: e.target.value })
                }
              >
                <option value="#5ec99c">Green</option>
                <option value="#38b2e0">Light Blue</option>
                <option value="#283170">Dark Blue</option>
                <option value="purple">Purple</option>
                <option value="rgb(248, 68, 68)">Red</option>
              </select>
            </div>
          </div>
          <p>Description</p>
          <textarea
            value={inputData.description}
            onChange={(e) =>
              change({ ...inputData, description: e.target.value })
            }
          />
          <p>Launch date</p>
          <input
            type="date"
            name="launch date"
            placeholder="Description"
            value={inputData.launch}
            onChange={(e) => change({ ...inputData, launch: e.target.value })}
          />
        </div>
        <div
          className="modal-footer"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <button
            style={{ marginLeft: "0" }}
            className="modal-close-btn"
            onClick={() => deleteProject(projectData.name)}
          >
            Delete
          </button>
          <div className="modal-buttons-right">
            <button
              className="modal-close-btn"
              onClick={() => changeDisplayEditProjectModal()}
            >
              Close
            </button>

            <button
              className="modal-create-btn"
              type="submit"
              onClick={() => addTheProject()}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddProject;

/* 
  
  change add function to edit function 
  
  can pass back the card name and use filter inside of edit project to add data
*/
