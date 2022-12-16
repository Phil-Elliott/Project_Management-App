import React, { useEffect, useState } from "react";
import Nav from "../Components/Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
import uuid from "react-uuid";
import "./Board.scss";
import { fakeDataProps, TaskProps } from "./Interfaces";
import Modal from "./Components/Modal/Modal";
import TaskModal from "./Tasks/TaskSection/Task/TaskModal/TaskModal";

const Board = () => {
  const [fakeData, setFakeData] = useState<fakeDataProps>({
    name: "Transfer Files",
    id: "1",
    background: "can be a color or an image(options for images)",
    members: ["John Doe", "Jane Doe", "Bob Tyler"],
    notes: [
      {
        id: "1",
        title: "Transfer Files",
        member: "John Doe",
        description: "Transfer files from old computer to new computer",
        urgency: "high",
        comments: [
          {
            id: "1",
            member: "John Doe",
            comment: "This is a comment",
          },
          {
            id: "1",
            member: "John Doe",
            comment: "This is a comment",
          },
        ],
      },
    ],
    tasksSections: [
      {
        id: "1dfghdfghgt6",
        order: 1,
        name: "Marketing",
      },
      {
        id: "65u56ufghngfh2",
        order: 2,
        name: "Design",
      },
      {
        id: "3657u56fghhrf",
        order: 3,
        name: "Production",
      },
      {
        id: "465y765ytrhftgh",
        order: 4,
        name: "Done",
      },
      {
        id: "dfhkulil6i75",
        order: 5,
        name: "Testing",
      },
      {
        id: "235756hfgrt",
        order: 6,
        name: "Other",
      },
    ],
    tasks: [
      {
        id: "153454354367656gfdbdfbfdbre",
        name: "Decide on what to transfer",
        assignedTo: ["John Doe", "Jane Doe"],
        description: "Decide on what to transfer",
        due: "2021-01-01",
        taskSection: {
          section: "Done",
          order: 1,
        },
        comments: [
          {
            id: "1dff43456655755",
            member: "John Doe",
            date: "March 18, 2022 12:54 PM",
            comment: "This is a comment",
          },
        ],
      },
      {
        id: "2ggfhbfdgbghn6556",
        name: "Eat a pizza",
        assignedTo: ["Jane Doe"],
        description: "Decide on what to transfer",
        due: "2021-01-01",
        taskSection: {
          section: "Done",
          order: 2,
        },
        comments: [
          {
            id: "15676556hfgh65rthrt",
            member: "John Doe",
            date: "March 18, 2022 12:54 PM",
            comment: "This is a comment",
          },
        ],
      },
      {
        id: "3rhh5y67565uyhnghnfghfg",
        name: "Take out trash",
        assignedTo: ["Forest Gump", "Jenny"],
        description: "Decide on what to transfer",
        due: "2021-01-01",
        taskSection: {
          section: "Production",
          order: 1,
        },
        comments: [
          {
            id: "1fghgfhhrt7657665765756",
            member: "John Doe",
            date: "March 18, 2022 12:54 PM",
            comment: "This is a comment",
          },
        ],
      },
    ],
  });
  const [display, setDisplay] = useState<boolean>(false);
  const [modalTask, setModalTask] = useState<TaskProps>();
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // modal functions
  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const disableCloseToggle = () => {
    setDisableCloseModal(true);
  };

  // disables ability to close modal when clicked outside of modal (when confirm modal is closed)
  const enableCloseToggle = () => {
    setDisableCloseModal(false);
  };

  // closes modal
  const closeModal = () => {
    setDisplay(false);
  };

  // displays the modal
  const changeModalDisplay = (id: string) => {
    setModalTask(fakeData.tasks.find((task) => task.id === id));
    setDisplay(!display);
  };

  // changes task data from the modal
  const changeTaskData = (data: TaskProps) => {
    setFakeData((prevFakeData) => {
      return {
        ...prevFakeData,
        tasks: prevFakeData.tasks.map((task) => {
          if (task.id === data.id) {
            return data;
          } else {
            return task;
          }
        }),
      };
    });
  };

  // deletes the task data from the modal
  const deleteTaskData = (id: string) => {
    setFakeData((prevFakeData) => {
      return {
        ...prevFakeData,
        tasks: prevFakeData.tasks.filter((task) => task.id !== id),
      };
    });
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // adds a new section to the data - triggered by addList btn
  const addNewSection = (name: string) => {
    const newSection = {
      id: uuid(),
      order: fakeData.tasksSections.length + 1,
      name,
    };
    setFakeData((prevFakeData) => {
      return {
        ...prevFakeData,
        tasksSections: [...prevFakeData.tasksSections, newSection],
      };
    });
  };

  // adds a new task to the section
  const addNewTask = (name: string, taskSection: string) => {
    // gets the order number for the new task
    const order =
      fakeData.tasks.filter((task) => task.taskSection.section === taskSection)
        .length + 1;

    const newTask = {
      id: uuid(),
      name,
      assignedTo: [],
      description: "",
      due: "",
      taskSection: {
        section: taskSection,
        order,
      },
      comments: [],
    };

    setFakeData((prevFakeData) => {
      return {
        ...prevFakeData,
        tasks: [...prevFakeData.tasks, newTask],
      };
    });
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // drag and drop functions

  // changes the order of the sections
  const changeSectionOrder = (id: string, order: number, source: number) => {
    setFakeData((prevData) => {
      return {
        ...prevData,
        tasksSections: prevData.tasksSections.map((section) => {
          if (section.id === id) {
            return {
              ...section,
              order: order,
            };
          } else if (section.order > source && section.order <= order) {
            return {
              ...section,
              order: section.order - 1,
            };
          } else if (section.order < source && section.order >= order) {
            return {
              ...section,
              order: section.order + 1,
            };
          } else {
            return section;
          }
        }),
      };
    });
  };

  // changes the task section and order within the task object - triggered by drag and drop
  const changeTaskPosition = (
    id: string,
    taskSection: string,
    order: number,
    source: string,
    sourceIndex: number
  ) => {
    setFakeData((prevFakeData) => {
      const taskSectionName = prevFakeData.tasksSections.find(
        (section) => section.id === taskSection
      )!.name;

      const sourceSectionName = prevFakeData.tasksSections.find(
        (section) => section.id === source
      )!.name;

      return {
        ...prevFakeData,
        tasks: prevFakeData.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              taskSection: {
                section: taskSectionName,
                order,
              },
            };
          } else if (
            taskSection === source &&
            task.taskSection.section === taskSectionName
          ) {
            if (
              order < sourceIndex &&
              task.taskSection.order >= order &&
              task.taskSection.order < sourceIndex
            ) {
              return {
                ...task,
                taskSection: {
                  ...task.taskSection,
                  order: task.taskSection.order + 1,
                },
              };
            } else if (
              order > sourceIndex &&
              task.taskSection.order <= order &&
              task.taskSection.order > sourceIndex
            ) {
              return {
                ...task,
                taskSection: {
                  ...task.taskSection,
                  order: task.taskSection.order - 1,
                },
              };
            } else {
              return task;
            }
          } else if (
            taskSection !== source &&
            task.taskSection.section === taskSectionName
          ) {
            if (task.taskSection.order >= order) {
              return {
                ...task,
                taskSection: {
                  ...task.taskSection,
                  order: task.taskSection.order + 1,
                },
              };
            } else {
              return task;
            }
          } else {
            return task;
          }
        }),
      };
    });
  };

  useEffect(() => {
    console.log(fakeData.tasks);
  }, [fakeData]);

  return (
    <div className="board-content-container">
      <Nav />
      <NavOptions members={fakeData.members} />
      <Tasks
        changeSectionOrder={changeSectionOrder}
        fakeData={fakeData}
        addNewSection={addNewSection}
        addNewTask={addNewTask}
        changeTaskPosition={changeTaskPosition}
        changeModalDisplay={changeModalDisplay}
      />
      {modalTask && (
        <Modal
          display={display}
          closeModal={closeModal}
          disableCloseModal={disableCloseModal}
        >
          <TaskModal
            modalTask={modalTask}
            changeTaskData={changeTaskData}
            deleteTaskData={deleteTaskData}
            display={display}
            closeModal={closeModal}
            disableCloseToggle={disableCloseToggle}
            enableCloseToggle={enableCloseToggle}
          />
        </Modal>
      )}
    </div>
  );
};

export default Board;

/*

  double modals
  - have a booleon state to confirm if there are two modals
  - If so then dont allow modal to close
  - if not then close modal



  on task click
    - show modal
    - close on escape and outside click (maybe use a hook for this)
        - what did you do for addtask part




         

  Show effect when task is dragged to done (or maybe just add that function to each task section to be chosen)






  6) Create the modal for the elipsis bttn on the taskSedction


  Start cleaning up the code (Its quite messy)


*/
