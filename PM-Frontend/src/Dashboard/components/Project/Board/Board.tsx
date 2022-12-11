import React, { useEffect } from "react";
import Nav from "../Components/Nav/Nav";
import NavOptions from "./NavOptions/NavOptions";
import Tasks from "./Tasks/Tasks";
import uuid from "react-uuid";
import "./Board.scss";
import { fakeDataProps } from "./Interfaces";

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

  // changes the task section within the task object - triggered by drag and drop
  /*
      1) Need to set new task section of dragged component
      2) Need to rearange the order of the tasks in the new task section
      3) Need to rearange the order of the tasks in the old task section


      check if old section and new section are same
        if same
          check if it is moving up or down
            if moving up
              everything in between old spot and new spot gets order +1
            if moving down
              everything in between old spot and new spot gets order -1
        if not same
          everything in between old spot and end of old section gets order -1
        

  */
  const changeTaskSection = (
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
              console.log("moving up");
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
              console.log("moving down");
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
        changeTaskSection={changeTaskSection}
      />
    </div>
  );
};

export default Board;

/*

  1) Move tasks around
        - Create a change task order function (changes order and section if it needs to)
        - make tasks draggable
        - have the changeTaskOrder function get called when the task is dropped



  1) Have addList btn be the same as addTask btn
  2) Create addTask function


  1) Make taskSection draggable 
  2) Make tasks draggable


  5) Create a modal for the task

  6) Create the modal for the elipsis bttn on the taskSedction


  Start cleaning up the code (Its quite messy)


*/
