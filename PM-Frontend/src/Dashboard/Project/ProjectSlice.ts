import { createSlice, PayloadAction, current } from "@reduxjs/toolkit";
import _ from "lodash";
import uuid from "react-uuid";
import {
  ProjectDataProps,
  TaskProps,
  TasksSections,
  User,
} from "~/shared/interfaces/Projects";

type ProjectState = {
  projects: ProjectDataProps[];
  user: User;
  searchQuery: string;
  selectedProject: string;
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
  taskSections: TasksSections[];
};

const initialState: ProjectState = {
  projects: [
    {
      name: "Do It",
      id: "2grgr3223r532rff3f",
      background: "can be a color or an image(options for images)",
      members: ["Meg Doe", "Jane Doe", "Addin Tyler"],
      notes: [
        {
          id: "efefwegnynjmymkuk",
          title: "Do It",
          member: "Meg Doe",
          description: "Transfer files from old computer to new computer",
          urgency: "high",
          comments: [
            {
              id: "124ntntrhnm4r5h",
              member: "John Doe",
              comment: "This is a comment",
            },
            {
              id: "325r43ngrjbgnvkjerkv",
              member: "John Doe",
              comment: "This is a comment",
            },
          ],
        },
      ],
      tasksSections: [
        {
          id: "1dfghdfghgt6",
          name: "Marketing",
          tasks: ["153454354367656gfdbdfbfdbre"],
        },
        {
          id: "65u56ufghngfh2",
          name: "Design",
          tasks: [],
        },
        {
          id: "3657u56fghhrf",
          name: "Production",
          tasks: [],
        },
        {
          id: "465y765ytrhftgh",
          name: "Done",
          tasks: [],
        },
        {
          id: "dfhkulil6i75",
          name: "Testing",
          tasks: ["2ggfhbfdgbghn6556", "3rhh5y67565uyhnghnfghfg"],
        },
        {
          id: "235756hfgrt",
          name: "Other",
          tasks: [],
        },
      ],
      tasks: [
        {
          id: "153454354367656gfdbdfbfdbre",
          name: "Do Something fun",
          assignedTo: ["John Doe", "Jane Doe"],
          description: "Decide on what to transfer",
          priority: "Low",
          due: "2021-01-01",
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
          name: "Slap someone, but playfully",
          assignedTo: ["Jane Doe"],
          description: "Decide on what to transfer",
          priority: "Normal",
          due: "2021-01-01",
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
    {
      name: "Transfer Files",
      id: "kuiluiokngfrgrg",
      background: "can be a color or an image(options for images)",
      members: ["John Doe", "Jane Doe", "Bob Tyler"],
      notes: [
        {
          id: "nguij45y65yb",
          title: "Transfer Files",
          member: "John Doe",
          description: "Transfer files from old computer to new computer",
          urgency: "high",
          comments: [
            {
              id: "gnruietbgi54i6y754ygrb",
              member: "John Doe",
              comment: "This is a comment",
            },
            {
              id: "54n6t43bgrbeubg",
              member: "John Doe",
              comment: "This is a comment",
            },
          ],
        },
      ],
      tasksSections: [
        {
          id: "1dfghdfghgt6",
          name: "Marketing",
          tasks: ["153454354367656gfdbdfbfdbre"],
        },
        {
          id: "65u56ufghngfh2",
          name: "Design",
          tasks: [],
        },
        {
          id: "3657u56fghhrf",
          name: "Production",
          tasks: [],
        },
        {
          id: "465y765ytrhftgh",
          name: "Done",
          tasks: [],
        },
        {
          id: "dfhkulil6i75",
          name: "Testing",
          tasks: ["2ggfhbfdgbghn6556", "3rhh5y67565uyhnghnfghfg"],
        },
        {
          id: "235756hfgrt",
          name: "Other",
          tasks: [],
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
  ],
  user: {
    id: "1",
    name: "John Doe",
    avatar: "red",
    watching: ["153454354367656gfdbdfbfdbre"],
  },
  searchQuery: "",
  selectedProject: "2grgr3223r532rff3f",
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<string>) => {
      state.selectedProject = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // section functions
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addSection: (state, action: PayloadAction<string>) => {
      const newSection = {
        id: uuid(),
        name: action.payload,
        tasks: [],
      };
      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasksSections = [...project.tasksSections, newSection];
        }
        return project;
      });
    },
    addTask: (state, action: PayloadAction<AddTaskProps>) => {
      // creates the new task to be added
      const newTask = {
        id: uuid(),
        name: action.payload.name,
        assignedTo: [],
        description: "",
        priority: "Low",
        due: "",
        comments: [],
      };

      // adds the new task to the tasks section
      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasksSections = project.tasksSections.map((section) => {
            if (section.id === action.payload.tasksSection) {
              section.tasks = [...section.tasks, newTask.id];
            }
            return section;
          });
          project.tasks = [...project.tasks, newTask];
        }
        return project;
      });
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // drag and drop functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    switchSectionOrder: (
      state,
      action: PayloadAction<SwitchSectionOrderProps>
    ) => {
      const { id, order, source } = action.payload;

      const sectionObj = state.projects
        .find((project) => project.id === state.selectedProject)
        ?.tasksSections.find((section) => section.id === id);

      const sections = _.cloneDeep(
        state.projects.find((project) => project.id === state.selectedProject)
          ?.tasksSections
      );
      sections!.splice(source, 1)[0];
      sections!.splice(order, 0, sectionObj!);

      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasksSections = sections!;
        }
        return project;
      });
    },

    switchTaskOrder: (state, action: PayloadAction<SwitchTaskOrderProps>) => {
      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasksSections = action.payload.taskSections;
        }
        return project;
      });

      // const { id, order, taskSection, source, sourceIndex } = action.payload;
      // console.log(action.payload);
      // const sameSection = taskSection === source;
      // state.project = {
      //   ...state.project,
      //   tasksSections: state.project.tasksSections.map((section) => {
      //     if (sameSection && section.id === taskSection) {
      //       const tasks = section.tasks;
      //       tasks.splice(sourceIndex, 1)[0];
      //       tasks.splice(order, 0, id);
      //       return { ...section, tasks };
      //     } else if (section.id === source) {
      //       const tasks = section.tasks;
      //       tasks.splice(sourceIndex, 1)[0];
      //       return { ...section, tasks };
      //     } else if (section.id === taskSection) {
      //       const tasks = section.tasks;
      //       tasks.splice(order, 0, id);
      //       return { ...section, tasks };
      //     } else {
      //       return section;
      //     }
      //   }),
      // };
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // task functions (from the modal)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    updateTask: (state, action: PayloadAction<TaskProps>) => {
      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasks = project.tasks.map((task) => {
            if (task.id === action.payload.id) {
              return action.payload;
            } else {
              return task;
            }
          });
        }
        return project;
      });
      // state.project = {
      //   ...state.project,
      //   tasks: state.project.tasks.map((task) => {
      //     if (task.id === action.payload.id) {
      //       return action.payload;
      //     } else {
      //       return task;
      //     }
      //   }),
      // };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.map((project) => {
        if (project.id === state.selectedProject) {
          project.tasks = project.tasks.filter(
            (task) => task.id !== action.payload
          );
        }
        return project;
      });
      // state.project = {
      //   ...state.project,
      //   tasks: state.project.tasks.filter((task) => task.id !== action.payload),
      // };
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
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Search Query
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    changeSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
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
  changeSearchQuery,
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
