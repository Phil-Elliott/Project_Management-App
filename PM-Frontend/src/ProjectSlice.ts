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
  jwt: string;
  project: ProjectDataProps;
  projectUsers: User[];
  sections: TasksSections[];
  orderedTasks: OrderedTasks[];
  projectTasks: ProjectTaskProps[];
};

type ProjectTaskProps = {
  section: string;
  tasks: TaskProps[];
};

type ChangeOrderProps = {
  change: boolean;
  section: string;
};

type OrderedTasks = {
  section: string;
  tasks: number[];
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

type AddProjectProps = {
  name: string;
  background: string;
};

/*
  projects: {
    id: string;
    title: string;
    background: string;
  }
  assigned: {
    figure out later
    should be located in the task
    insert from data from members
  }
  members: {
    figure out later
    need to save the members details to this table
  }
  tasks: {
    id: string;
    title: string;
    description: string;
    priority: string;
    due: string;
    comments: {
      id: string;
      task: string;
      member: string;
  }
  sections: {
    id: string;
    title: string;
  }
  watching: {
    figure out later
    should be located in the task
  }

*/

const initialState: ProjectState = {
  projects: [],
  user: {
    id: "",
    username: "",
    avatar: "",
  },
  searchQuery: "",
  jwt: "",
  project: {
    id: "",
    title: "",
    background: "",
  },
  projectUsers: [],
  sections: [],
  orderedTasks: [],
  projectTasks: [],
};

export const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setProjects: (state, action: PayloadAction<ProjectDataProps[]>) => {
      state.projects = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setProject: (state, action: PayloadAction<ProjectDataProps>) => {
      state.project = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setProjectUsers: (state, action: PayloadAction<User[]>) => {
      state.projectUsers = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setSections: (state, action: PayloadAction<TasksSections[]>) => {
      state.sections = action.payload;
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setProjectTasks: (state, action: PayloadAction<ProjectTaskProps>) => {
      // see if task is already in array
      const taskIndex = state.projectTasks.findIndex(
        (taskObj) => taskObj.section === action.payload.section
      );
      // if section is not in array, add it
      if (taskIndex === -1) {
        state.projectTasks = [...state.projectTasks, action.payload];
      } else {
        // if section is in array, add task to it
        state.projectTasks[taskIndex].tasks = action.payload.tasks;
      }
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setProjectTasksOrder: (
      state,
      action: PayloadAction<ProjectTaskProps[]>
    ) => {
      state.projectTasks = action.payload;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setOrderedTasks: (state, action: PayloadAction<OrderedTasks>) => {
      // see section is already in array
      const sectionIndex = state.orderedTasks.findIndex(
        (sectionObj) => sectionObj.section === action.payload.section
      );
      // if section is not in array, add it
      if (sectionIndex === -1) {
        state.orderedTasks = [...state.orderedTasks, action.payload];
      } else {
        // if section is in array, add task to it
        state.orderedTasks[sectionIndex].tasks = action.payload.tasks;
      }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // user functions
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    setUser: (state, action: PayloadAction<User>) => {
      state.user = {
        id: action.payload.id,
        username: action.payload.username,
        avatar: action.payload.avatar,
      };
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // project functions
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addProject: (state, action: PayloadAction<AddProjectProps>) => {
      // const newProject = {
      //   name: action.payload.name,
      //   id: uuid(),
      //   background: action.payload.background,
      //   members: [],
      //   notes: [],
      //   tasksSections: [],
      //   tasks: [],
      // };
      // state.projects = [...state.projects, newProject];
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // section functions
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addSection: (state, action: PayloadAction<TasksSections>) => {
      state.sections = [...state.sections, action.payload];
    },
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // drag and drop functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    switchSectionOrder: (
      state,
      action: PayloadAction<SwitchSectionOrderProps>
    ) => {
      // const { id, order, source } = action.payload;
      // const sectionObj = state.projects
      //   .find((project) => project.id === state.selectedProject)
      //   ?.tasksSections.find((section) => section.id === id);
      // const sections = _.cloneDeep(
      //   state.projects.find((project) => project.id === state.selectedProject)
      //     ?.tasksSections
      // );
      // sections!.splice(source, 1)[0];
      // sections!.splice(order, 0, sectionObj!);
      // state.projects = state.projects.map((project) => {
      //   if (project.id === state.selectedProject) {
      //     project.tasksSections = sections!;
      //   }
      //   return project;
      // });
    },

    switchTaskOrder: (state, action: PayloadAction<SwitchTaskOrderProps>) => {
      // state.projects = state.projects.map((project) => {
      //   if (project.id === state.selectedProject) {
      //     project.tasksSections = action.payload.taskSections;
      //   }
      //   return project;
      // });
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
      // state.projects = state.projects.map((project) => {
      //   if (project.id === state.selectedProject) {
      //     project.tasks = project.tasks.map((task) => {
      //       if (task.id === action.payload.id) {
      //         return action.payload;
      //       } else {
      //         return task;
      //       }
      //     });
      //   }
      //   return project;
      // });
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
      // state.projects = state.projects.map((project) => {
      // if (project.id === state.selectedProject) {
      //   project.tasks = project.tasks.filter(
      //     (task) => task.id !== action.payload
      //   );
      // }
      // return project;
      // });
      // state.project = {
      //   ...state.project,
      //   tasks: state.project.tasks.filter((task) => task.id !== action.payload),
      // };
    },
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Watching Functions
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    addWatchingTask: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        // watching: [...state.user.watching, action.payload],
      };
    },
    removeWatchingTask: (state, action: PayloadAction<string>) => {
      state.user = {
        ...state.user,
        // watching: state.user.watching.filter((id) => id !== action.payload),
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
  setJwt,
  setProjects,
  setOrderedTasks,
  setUser,
  setProject,
  setProjectUsers,
  setSections,

  setProjectTasks,
  setProjectTasksOrder,

  addProject,
  addSection,
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
