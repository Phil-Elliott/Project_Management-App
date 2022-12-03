import React from "react";
import Nav from "../Components/Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";

export type fakeDataProps = {
  name: string;
  id: string;
  background: string;
  members: string[];
  notes: {
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
  }[];
  tasksSections: {
    id: string;
    name: string;
  }[];
  tasks: {
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
    <div>
      <Nav />
      <NavOptions members={fakeData.members} />
      <Tasks fakeData={fakeData} />
    </div>
  );
};

export default Board;

/*

  map through task sections and create a task section component for each one
          (need to make sure that you can keep moving to the right)
          (Find a way to scroll by clicking and holding the mouse button)
  place tasks under appropriate sections
  find a way to drag the tasks to another section
          (need to change the taskSection property in the task object)
  create a modal for the task and make it functional

  structure
    - Board
      - Nav (from left)
        - search
           - test that it returns correct results
        - filter (ame as trello)
           - modal
        - members
           - test that it returns all of the members invited to project 
        - invite bttn
           - modal (invite by email like trello)
           - test that it sends invite to member 

      - Modal
        - test that it opens on click 
        - test that it populates the correct data

      - TaskSection
        - settings modal (like trello)
        - Task
        - AddCard display
      




  Plug in some fake data 
  Create the display 
  Create the modals 
  Add functionality and plug into to the start of the app


let fakeData = {
  //   name: "Transfer Files",
  //   id: "1",
  //   background: "can be a color or an image(options for images)",
  //   members: ["John Doe", "Jane Doe", "Bob Tyler"],
  //   notes: [
  //     {
  //       id: "1",
  //       title: "Transfer Files",
  //       member: "John Doe",
  //       description: "Transfer files from old computer to new computer",
  //       urgency: "high",
  //       comments: [
  //         {
  //           id: "1",
  //           member: "John Doe",
  //           comment: "This is a comment",
  //         },
  //       ],
  //     },
  //   ],
  //   tasksSections: [
  //     {
  //       id: "1",
  //       name: "Marketing",
  //     },
  //     {
  //       id: "2",
  //       name: "Design",
  //     },
  //     {
  //       id: "3",
  //       name: "Production",
  //     },
  //     {
  //       id: "4",
  //       name: "Done",
  //     },
  //   ],
  //   tasks: [
  //     {
  //       id: "1",
  //       name: "Decide on what to transfer",
  //       assignedTo: ["John Doe", "Jane Doe"],
  //       description: "Decide on what to transfer",
  //       due: "2021-01-01",
  //       taskSection: "Done",
  //       comments: [
  //         {
  //           id: "1",
  //           member: "John Doe",
  //           date: "March 18, 2022 12:54 PM",
  //           comment: "This is a comment",
  //         },
  //       ],
  //     },
  //   ],
  // };

*/
