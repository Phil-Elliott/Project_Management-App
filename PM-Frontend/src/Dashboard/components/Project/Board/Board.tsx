import React from "react";
import Nav from "../Components/Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
import uuid from "react-uuid";
import "./Board.scss";

export type fakeDataProps = {
  name: string;
  id: string;
  background: string;
  members: string[];
  notes: Note[];
  tasksSections: TasksSections[];
  tasks: TaskProps[];
};

export type Note = {
  id: string;
  title: string;
  member: string;
  description: string;
  urgency: string;
  comments: {
    id: string;
    member: string;
    comment: string;
  }[];
};

export type TasksSections = {
  id: string;
  order: number;
  name: string;
};

export type TaskProps = {
  id: string;
  name: string;
  assignedTo: string[];
  description: string;
  due: string;
  taskSection: string;
  comments: {
    id: string;
    member: string;
    date: string;
    comment: string;
  }[];
};

const Board = () => {
  const [fakeData, setFakeData] = React.useState<fakeDataProps>({
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
        id: "1",
        order: 5,
        name: "Marketing",
      },
      {
        id: "2",
        order: 2,
        name: "Design",
      },
      {
        id: "3",
        order: 3,
        name: "Production",
      },
      {
        id: "4",
        order: 4,
        name: "Done",
      },
      {
        id: "5",
        order: 1,
        name: "Testing",
      },
      {
        id: "6",
        order: 6,
        name: "Other",
      },
    ],
    tasks: [
      {
        id: "1",
        name: "Decide on what to transfer",
        assignedTo: ["John Doe", "Jane Doe"],
        description: "Decide on what to transfer",
        due: "2021-01-01",
        taskSection: "Done",
        comments: [
          {
            id: "1",
            member: "John Doe",
            date: "March 18, 2022 12:54 PM",
            comment: "This is a comment",
          },
        ],
      },
    ],
  });

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
    const newTask = {
      id: uuid(),
      name,
      assignedTo: [],
      description: "",
      due: "",
      taskSection,
      comments: [],
    };
    setFakeData((prevFakeData) => {
      return {
        ...prevFakeData,
        tasks: [...prevFakeData.tasks, newTask],
      };
    });
  };

  return (
    <div className="board-content-container">
      <Nav />
      <NavOptions members={fakeData.members} />
      <Tasks
        fakeData={fakeData}
        addNewSection={addNewSection}
        addNewTask={addNewTask}
      />
    </div>
  );
};

export default Board;

/*

  1) Could have array for section
          [sectionName, orderNumber]
          - when task moves (change name and orderNumber)
          - Would have to change order numbers for all tasks in that section






  1) Have tasks get ordered within sections
      - could have the task get a higher order than the one it is above
      - could change the layout of the data
        - have each task within a section and have an order for each task



  1) Have addList btn be the same as addTask btn
  2) Create addTask function


  1) Make taskSection draggable 
  2) Make tasks draggable


  5) Create a modal for the task

  6) Create the modal for the elipsis bttn on the taskSedction


  Start cleaning up the code (Its quite messy)


*/
