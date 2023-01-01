import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import {
  ProjectDataProps,
  TaskProps,
  User,
} from "~/shared/interfaces/Projects";

type ProjectState = {
  project: ProjectDataProps;
  user: User;
};

type AddTaskProps = {
  name: string;
  tasksSection: string;
};

type SwitchSectionOrderProps = {
  id: string;
  order: number;
  source: number;
};

type SwitchTaskOrderProps = {
  id: string;
  taskSection: string;
  order: number;
  source: string;
  sourceIndex: number;
};

const initialState: ProjectState = {
  project: {
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
        priority: "Low",
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
            comment: "Decide on what to transfer comment",
          },
        ],
      },
      {
        id: "2ggfhbfdgbghn6556",
        name: "Eat a pizza",
        assignedTo: ["Jane Doe"],
        description: "Decide on what to transfer",
        priority: "Normal",
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
            comment: "Eat a pizza comment",
          },
        ],
      },
      {
        id: "3rhh5y67565uyhnghnfghfg",
        name: "Take out trash",
        assignedTo: ["Forest Gump", "Jenny"],
        description: "Take out trash",
        priority: "High",
        due: "2021-01-01",
        taskSection: {
          section: "Production",
          order: 1,
        },
        comments: [
          {
            id: "1fghgfhhrt7657665765756",
            member: "John Doe",
            date: "December 19, 2022 12:54 PM",
            comment: "Take out trash comment",
          },
          {
            id: "efefekwbfkj35346534eufdb",
            member: "Jane",
            date: "November 15, 2022 1:54 AM",
            comment: "I like trash",
          },
        ],
      },
    ],
  },
  user: {
    id: "1",
    name: "John Doe",
    avatar: "red",
    watching: ["153454354367656gfdbdfbfdbre"],
  },
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<ProjectDataProps>) => {
      state.project = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // section functions
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addSection: (state, action: PayloadAction<string>) => {
      const newSection = {
        id: uuid(),
        order: state.project.tasksSections.length + 1,
        name: action.payload,
      };
      state.project = {
        ...state.project,
        tasksSections: [...state.project.tasksSections, newSection],
      };
    },
    addTask: (state, action: PayloadAction<AddTaskProps>) => {
      // gets the order number for the new task
      const order =
        state.project.tasks.filter(
          (task) => task.taskSection.section === action.payload.tasksSection
        ).length + 1;

      const newTask = {
        id: uuid(),
        name: action.payload.name,
        assignedTo: [],
        description: "",
        priority: "Low",
        due: "",
        taskSection: {
          section: action.payload.tasksSection,
          order,
        },
        comments: [],
      };

      state.project = {
        ...state.project,
        tasks: [...state.project.tasks, newTask],
      };
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // drag and drop functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    switchSectionOrder: (
      state,
      action: PayloadAction<SwitchSectionOrderProps>
    ) => {
      const { id, order, source } = action.payload;
      state.project = {
        ...state.project,
        tasksSections: state.project.tasksSections.map((section) => {
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
    },
    switchTaskOrder: (state, action: PayloadAction<SwitchTaskOrderProps>) => {
      const { id, order, taskSection, source, sourceIndex } = action.payload;
      const taskSectionName = state.project.tasksSections.find(
        (section) => section.id === taskSection
      )!.name;

      const sourceSectionName = state.project.tasksSections.find(
        (section) => section.id === source
      )!.name;

      state.project = {
        ...state.project,
        tasks: state.project.tasks.map((task) => {
          if (task.id === id) {
            return {
              ...task,
              taskSection: {
                section: taskSectionName,
                order,
              },
            };
          } else if (
            task.taskSection.section === taskSectionName &&
            task.taskSection.order > sourceIndex &&
            task.taskSection.order <= order
          ) {
            return {
              ...task,
              taskSection: {
                ...task.taskSection,
                order: task.taskSection.order - 1,
              },
            };
          } else if (
            task.taskSection.section === taskSectionName &&
            task.taskSection.order < sourceIndex &&
            task.taskSection.order >= order
          ) {
            return {
              ...task,
              taskSection: {
                ...task.taskSection,
                order: task.taskSection.order + 1,
              },
            };
          } else if (
            task.taskSection.section === sourceSectionName &&
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
        }),
      };
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task functions (from the modal)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    updateTask: (state, action: PayloadAction<TaskProps>) => {
      state.project = {
        ...state.project,
        tasks: state.project.tasks.map((task) => {
          if (task.id === action.payload.id) {
            return action.payload;
          } else {
            return task;
          }
        }),
      };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.project = {
        ...state.project,
        tasks: state.project.tasks.filter((task) => task.id !== action.payload),
      };
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // User Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addWatchingTask: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        watching: [...state.user.watching, action.payload],
      };
    },
    removeWatchingTask: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        watching: state.user.watching.filter((id) => id !== action.payload),
      };
    },
  },
});

export const {
  setProject,
  addSection,
  addTask,
  switchSectionOrder,
  switchTaskOrder,
  updateTask,
  deleteTask,
  addWatchingTask,
  removeWatchingTask,
} = projectSlice.actions;

export default projectSlice.reducer;

// const addNewSection = (name: string) => {
//     const newSection = {
//       id: uuid(),
//       order: fakeData.tasksSections.length + 1,
//       name,
//     };
//     setFakeData((prevFakeData) => {
//       return {
//         ...prevFakeData,
//         tasksSections: [...prevFakeData.tasksSections, newSection],
//       };
//     });
//   };

// const addNewTask = (name: string, taskSection: string) => {
//   // gets the order number for the new task
//   const order =
//     fakeData.tasks.filter((task) => task.taskSection.section === taskSection)
//       .length + 1;

//   const newTask = {
//     id: uuid(),
//     name,
//     assignedTo: [],
//     description: "",
//     priority: "Low",
//     due: "",
//     taskSection: {
//       section: taskSection,
//       order,
//     },
//     comments: [],
//   };

//   setFakeData((prevFakeData) => {
//     return {
//       ...prevFakeData,
//       tasks: [...prevFakeData.tasks, newTask],
//     };
//   });
// };

// const changeSectionOrder = (id: string, order: number, source: number) => {
//   setFakeData((prevData) => {
//     return {
//       ...prevData,
//       tasksSections: prevData.tasksSections.map((section) => {
//         if (section.id === id) {
//           return {
//             ...section,
//             order: order,
//           };
//         } else if (section.order > source && section.order <= order) {
//           return {
//             ...section,
//             order: section.order - 1,
//           };
//         } else if (section.order < source && section.order >= order) {
//           return {
//             ...section,
//             order: section.order + 1,
//           };
//         } else {
//           return section;
//         }
//       }),
//     };
//   });
// };

// const changeTaskPosition = (
//   id: string,
//   taskSection: string,
//   order: number,
//   source: string,
//   sourceIndex: number
// ) => {
//   setFakeData((prevFakeData) => {
//     const taskSectionName = prevFakeData.tasksSections.find(
//       (section) => section.id === taskSection
//     )!.name;

//     const sourceSectionName = prevFakeData.tasksSections.find(
//       (section) => section.id === source
//     )!.name;

//     return {
//       ...prevFakeData,
//       tasks: prevFakeData.tasks.map((task) => {
//         if (task.id === id) {
//           return {
//             ...task,
//             taskSection: {
//               section: taskSectionName,
//               order,
//             },
//           };
//         } else if (
//           taskSection === source &&
//           task.taskSection.section === taskSectionName
//         ) {
//           if (
//             order < sourceIndex &&
//             task.taskSection.order >= order &&
//             task.taskSection.order < sourceIndex
//           ) {
//             return {
//               ...task,
//               taskSection: {
//                 ...task.taskSection,
//                 order: task.taskSection.order + 1,
//               },
//             };
//           } else if (
//             order > sourceIndex &&
//             task.taskSection.order <= order &&
//             task.taskSection.order > sourceIndex
//           ) {
//             return {
//               ...task,
//               taskSection: {
//                 ...task.taskSection,
//                 order: task.taskSection.order - 1,
//               },
//             };
//           } else {
//             return task;
//           }
//         } else if (
//           taskSection !== source &&
//           task.taskSection.section === taskSectionName
//         ) {
//           if (task.taskSection.order >= order) {
//             return {
//               ...task,
//               taskSection: {
//                 ...task.taskSection,
//                 order: task.taskSection.order + 1,
//               },
//             };
//           } else {
//             return task;
//           }
//         } else {
//           return task;
//         }
//       }),
//     };
//   });
// };

// const changeTaskData = (data: TaskProps) => {
//   setFakeData((prevFakeData) => {
//     return {
//       ...prevFakeData,
//       tasks: prevFakeData.tasks.map((task) => {
//         if (task.id === data.id) {
//           return data;
//         } else {
//           return task;
//         }
//       }),
//     };
//   });
// };

// const addWatching = (taskID: string) => {
//   setUser((prevUser) => {
//     return {
//       ...prevUser,
//       watching: [...prevUser.watching, taskID],
//     };
//   });
// };

// const removeWatching = (taskID: string) => {
//   setUser((prevUser) => {
//     return {
//       ...prevUser,
//       watching: prevUser.watching.filter((id: string) => id !== taskID),
//     };
//   });
// };
