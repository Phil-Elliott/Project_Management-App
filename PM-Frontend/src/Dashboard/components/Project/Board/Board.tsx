import React from "react";
import Nav from "../Components/Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
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
  };
};

export type TasksSections = {
  id: string;
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
        ],
      },
    ],
    tasksSections: [
      {
        id: "1",
        name: "Marketing",
      },
      {
        id: "2",
        name: "Design",
      },
      {
        id: "3",
        name: "Production",
      },
      {
        id: "4",
        name: "Done",
      },
      {
        id: "5",
        name: "Testing",
      },
      {
        id: "6",
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

  return (
    <div className="board-content-container">
      <Nav />
      <NavOptions members={fakeData.members} />
      <Tasks fakeData={fakeData} />
    </div>
  );
};

export default Board;

/*

  1) Make taskSection draggable 
  2) Make tasks draggable


  3) Fixup add another list bttn to change when clicked 
  4) Have it add the task afterwards 

  5) Create a modal for the task

  6) Create the modal for the elipsis bttn on the taskSedction


*/
