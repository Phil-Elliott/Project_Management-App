import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { projectData, tasksData, commentsData } from "./Interfaces";

export interface ProjectsState {
  projects: Array<projectData>;
  activeProject: projectData;
  searchQuery: string;
}

export interface editProjectsData {
  project: projectData;
  name: string;
}

export interface edit {
  taskObj: tasksData;
  name: string;
}

export interface complete {
  taskObj: tasksData;
  name: string;
  complete: boolean;
}

export interface comments {
  commentData: commentsData;
  name: string;
}

const initialState: ProjectsState = {
  projects: [
    {
      name: "Transfer Files",
      id: "1",
      initials: "TF",
      color: "#5ec99c",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-08-26",
      tasks: [
        {
          name: "Decide on what to transfer",
          department: "Accounting",
          date: "2022-05-24",
          assigned: "John Ellie",
          comments: [
            {
              name: "Bob Tyler",
              date: "March 18, 2022 12:54 PM",
              comment: "We might need to change the deadline to a later date.",
            },
            {
              name: "Darrel Kent",
              date: "March 18, 2022 2:17 PM",
              comment:
                "That is not a problem Bob. Just let me know when the new deadline will be.",
            },
          ],
        },
        {
          name: "Call about files",
          department: "Sales",
          date: "2022-04-27",
          assigned: "Tim",
          comments: [],
        },
        {
          name: "Figure out a structure",
          department: "Marketing",
          date: "2022-07-18",
          assigned: "Josh Sterling",
          comments: [],
        },
        {
          name: "Delete unnecessary files",
          department: "Accounting",
          date: "2022-04-06",
          assigned: "Lisa Atkins",
          comments: [
            {
              name: "Sarah Evans",
              date: "March 29, 2022 7:54 AM",
              comment: "Which files should we start with?",
            },
            {
              name: "Dan Thompson",
              date: "March 29, 2022 12:17 PM",
              comment:
                "Start with the oldest files in the system and make sure they have already been backed up.",
            },
            {
              name: "Marry Glass",
              date: "March 29, 2022 2:24 PM",
              comment: "I will be able to help starting tomorrow afternoon.",
            },
            {
              name: "Sarah Evans",
              date: "March 29, 2022 4:31 PM",
              comment: "Thanks Marry",
            },
          ],
        },
        {
          name: "Hire new employee",
          department: "Human Resources",
          date: "2022-04-14",
          assigned: "Tracy Daniels",
          comments: [],
        },
        {
          name: "Track progress",
          department: "Management",
          date: "2022-04-18",
          assigned: "Mark Stein",
          comments: [],
        },
        {
          name: "Sign documents",
          department: "Marketing",
          date: "2022-03-20",
          assigned: "Josh Peck",
          comments: [],
        },
        {
          name: "Meet clients",
          department: "Sales",
          date: "2022-03-08",
          assigned: "Diane",
          comments: [],
        },
        {
          name: "Fix UI",
          department: "Marketing",
          date: "2022-04-09",
          assigned: "Jose Nunez",
          comments: [],
        },
      ],
      completed: [
        {
          name: "Start project",
          department: "Management",
          date: "2022-03-13",
          assigned: "Samuel Eli",
          comments: [],
        },
      ],
    },
    {
      name: "Fix Website",
      id: "2",
      initials: "FW",
      color: "#38b2e0",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2023-01-13",
      tasks: [
        {
          name: "Decide on what to transfer",
          department: "Accounting",
          date: "2022-03-24",
          assigned: "John Ellie",
          comments: [],
        },
        {
          name: "Call about files",
          department: "Sales",
          date: "2022-03-27",
          assigned: "Tim",
          comments: [
            {
              name: "Bob Tyler",
              date: "March 18, 2022 12:54 PM",
              comment: "We might need to change the deadline to a later date.",
            },
            {
              name: "Darrel Kent",
              date: "March 18, 2022 2:17 PM",
              comment:
                "That is not a problem Bob. Just let me know when the new deadline will be.",
            },
          ],
        },
        {
          name: "Figure out a structure",
          department: "Marketing",
          date: "2022-07-18",
          assigned: "Josh Sterling",
          comments: [],
        },
        {
          name: "Delete unnecessary files",
          department: "Accounting",
          date: "2022-03-25",
          assigned: "Lisa Atkins",
          comments: [
            {
              name: "Sarah Evans",
              date: "March 29, 2022 7:54 AM",
              comment: "Which files should we start with?",
            },
            {
              name: "Dan Thompson",
              date: "March 29, 2022 12:17 PM",
              comment:
                "Start with the oldest files in the system and make sure they have already been backed up.",
            },
            {
              name: "Marry Glass",
              date: "March 29, 2022 2:24 PM",
              comment: "I will be able to help starting tomorrow afternoon.",
            },
            {
              name: "Sarah Evans",
              date: "March 29, 2022 4:31 PM",
              comment: "Thanks Marry",
            },
          ],
        },
      ],
      completed: [
        {
          name: "Start project",
          department: "Management",
          date: "2022-03-13",
          assigned: "Samuel Eli",
          comments: [],
        },
        {
          name: "Hire new employee",
          department: "Human Resources",
          date: "2022-03-29",
          assigned: "Tracy Daniels",
          comments: [],
        },
        {
          name: "Track progress",
          department: "Management",
          date: "2022-04-18",
          assigned: "Mark Stein",
          comments: [],
        },
        {
          name: "Sign documents",
          department: "Marketing",
          date: "2022-03-20",
          assigned: "Josh Peck",
          comments: [],
        },
        {
          name: "Meet clients",
          department: "Sales",
          date: "2022-03-08",
          assigned: "Diane",
          comments: [],
        },
        {
          name: "Fix UI",
          department: "Marketing",
          date: "2022-03-09",
          assigned: "Jose Nunez",
          comments: [],
        },
      ],
    },
    // {
    //   name: "Renovate Office",
    //   id: "3",
    //   initials: "RO",
    //   color: "#283170",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    //   launch: "2022-11-02",
    //   tasks: [
    //     {
    //       name: "Decide on what to transfer",
    //       department: "Accounting",
    //       date: "2022-03-24",
    //       assigned: "John Ellie",
    //       comments: [
    //         {
    //           name: "Bob Tyler",
    //           date: "March 18, 2022 12:54 PM",
    //           comment: "We might need to change the deadline to a later date.",
    //         },
    //         {
    //           name: "Darrel Kent",
    //           date: "March 18, 2022 2:17 PM",
    //           comment:
    //             "That is not a problem Bob. Just let me know when the new deadline will be.",
    //         },
    //       ],
    //     },

    //     {
    //       name: "Delete unnecessary files",
    //       department: "Accounting",
    //       date: "2022-03-25",
    //       assigned: "Lisa Atkins",
    //       comments: [],
    //     },
    //     {
    //       name: "Hire new employee",
    //       department: "Human Resources",
    //       date: "2022-03-29",
    //       assigned: "Tracy Daniels",
    //       comments: [],
    //     },
    //     {
    //       name: "Track progress",
    //       department: "Management",
    //       date: "2022-04-18",
    //       assigned: "Mark Stein",
    //       comments: [],
    //     },
    //     {
    //       name: "Sign documents",
    //       department: "Marketing",
    //       date: "2022-03-20",
    //       assigned: "Josh Peck",
    //       comments: [],
    //     },
    //     {
    //       name: "Meet clients",
    //       department: "Sales",
    //       date: "2022-03-08",
    //       assigned: "Diane",
    //       comments: [],
    //     },
    //     {
    //       name: "Fix UI",
    //       department: "Marketing",
    //       date: "2022-03-09",
    //       assigned: "Jose Nunez",
    //       comments: [],
    //     },
    //   ],
    //   completed: [
    //     {
    //       name: "Start project",
    //       department: "Management",
    //       date: "2022-03-13",
    //       assigned: "Samuel Eli",
    //       comments: [],
    //     },
    //     {
    //       name: "Call about files",
    //       department: "Sales",
    //       date: "2022-03-27",
    //       assigned: "Tim",
    //       comments: [],
    //     },
    //     {
    //       name: "Figure out a structure",
    //       department: "Marketing",
    //       date: "2022-07-18",
    //       assigned: "Josh Sterling",
    //       comments: [],
    //     },
    //   ],
    // },
    // {
    //   name: "Hire Employees",
    //   initials: "HE",
    //   color: "purple",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    //   launch: "2022-05-26",
    //   tasks: [
    //     {
    //       name: "Fix UI",
    //       department: "Marketing",
    //       date: "2022-04-01",
    //       assigned: "Jose Nunez",
    //       comments: [
    //         {
    //           name: "Tim Evans",
    //           date: "March 18, 2022 12:54 PM",
    //           comment:
    //             "Everything looks great. Let me know if you need any help.",
    //         },
    //         {
    //           name: "Jose Nunez",
    //           date: "March 18, 2022 2:54 PM",
    //           comment: "Thanks Tim and I will",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Change name",
    //       department: "Marketing",
    //       date: "2022-04-26",
    //       assigned: "Mark Johnson",
    //       comments: [
    //         {
    //           name: "Sam Smith",
    //           date: "March 26, 2022 8:11 AM",
    //           comment:
    //             "Have you though of any new names based off of the market research?",
    //         },
    //         {
    //           name: "Mark Johnson",
    //           date: "March 27, 2022 3:26 PM",
    //           comment:
    //             "We are still looking at the data and we should have a decision soon.",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Hire employee",
    //       department: "HR",
    //       date: "2022-04-19",
    //       assigned: "Jose Nunez",
    //       comments: [],
    //     },
    //     {
    //       name: "Adjust Budget",
    //       department: "Accounting",
    //       date: "2022-05-18",
    //       assigned: "Jose Nunez",
    //       comments: [],
    //     },
    //   ],
    //   completed: [
    //     {
    //       name: "Start project",
    //       department: "Management",
    //       date: "2022-03-13",
    //       assigned: "Samuel Eli",
    //       comments: [],
    //     },
    //     {
    //       name: "Decide on what to transfer",
    //       department: "Accounting",
    //       date: "2022-03-24",
    //       assigned: "John Ellie",
    //       comments: [],
    //     },
    //     {
    //       name: "Call about files",
    //       department: "Sales",
    //       date: "2022-03-27",
    //       assigned: "Tim",
    //       comments: [],
    //     },
    //     {
    //       name: "Figure out a structure",
    //       department: "Marketing",
    //       date: "2022-07-18",
    //       assigned: "Josh Sterling",
    //       comments: [
    //         {
    //           name: "Sarah Evans",
    //           date: "March 29, 2022 7:54 AM",
    //           comment: "Which files should we start with?",
    //         },
    //         {
    //           name: "Dan Thompson",
    //           date: "March 29, 2022 12:17 PM",
    //           comment:
    //             "Start with the oldest files in the system and make sure they have already been backed up.",
    //         },
    //         {
    //           name: "Marry Glass",
    //           date: "March 29, 2022 2:24 PM",
    //           comment: "I will be able to help starting tomorrow afternoon.",
    //         },
    //         {
    //           name: "Sarah Evans",
    //           date: "March 29, 2022 4:31 PM",
    //           comment: "Thanks Marry",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Delete unnecessary files",
    //       department: "Accounting",
    //       date: "2022-03-25",
    //       assigned: "Lisa Atkins",
    //       comments: [],
    //     },
    //     {
    //       name: "Hire new employee",
    //       department: "Human Resources",
    //       date: "2022-03-29",
    //       assigned: "Tracy Daniels",
    //       comments: [],
    //     },
    //     {
    //       name: "Track progress",
    //       department: "Management",
    //       date: "2022-04-18",
    //       assigned: "Mark Stein",
    //       comments: [],
    //     },
    //     {
    //       name: "Sign documents",
    //       department: "Marketing",
    //       date: "2022-03-20",
    //       assigned: "Josh Peck",
    //       comments: [],
    //     },
    //     {
    //       name: "Meet clients",
    //       department: "Sales",
    //       date: "2022-03-08",
    //       assigned: "Diane",
    //       comments: [],
    //     },
    //   ],
    // },
    // {
    //   name: "Train Developers",
    //   initials: "TD",
    //   color: "rgb(248, 68, 68)",
    //   description:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    //   launch: "2022-07-06",
    //   tasks: [
    //     {
    //       name: "Hire new employee",
    //       department: "Human Resources",
    //       date: "2022-04-29",
    //       assigned: "Tracy Daniels",
    //       comments: [],
    //     },
    //     {
    //       name: "Track progress",
    //       department: "Management",
    //       date: "2022-06-18",
    //       assigned: "Mark Stein",
    //       comments: [
    //         {
    //           name: "Sarah Evans",
    //           date: "March 29, 2022 7:54 AM",
    //           comment: "Which files should we start with?",
    //         },
    //         {
    //           name: "Dan Thompson",
    //           date: "March 29, 2022 12:17 PM",
    //           comment:
    //             "Start with the oldest files in the system and make sure they have already been backed up.",
    //         },
    //         {
    //           name: "Marry Glass",
    //           date: "March 29, 2022 2:24 PM",
    //           comment: "I will be able to help starting tomorrow afternoon.",
    //         },
    //         {
    //           name: "Sarah Evans",
    //           date: "March 29, 2022 4:31 PM",
    //           comment: "Thanks Marry",
    //         },
    //       ],
    //     },
    //     {
    //       name: "Sign documents",
    //       department: "Marketing",
    //       date: "2022-03-20",
    //       assigned: "Josh Peck",
    //       comments: [],
    //     },
    //     {
    //       name: "Meet clients",
    //       department: "Sales",
    //       date: "2022-03-22",
    //       assigned: "Diane",
    //       comments: [],
    //     },
    //     {
    //       name: "Fix UI",
    //       department: "Marketing",
    //       date: "2022-04-05",
    //       assigned: "Jose Nunez",
    //       comments: [],
    //     },
    //   ],
    //   completed: [
    //     {
    //       name: "Start project",
    //       department: "Management",
    //       date: "2022-03-13",
    //       assigned: "Samuel Eli",
    //       comments: [],
    //     },
    //     {
    //       name: "Decide on what to transfer",
    //       department: "Accounting",
    //       date: "2022-03-24",
    //       assigned: "John Ellie",
    //       comments: [],
    //     },
    //     {
    //       name: "Call about files",
    //       department: "Sales",
    //       date: "2022-03-27",
    //       assigned: "Tim",
    //       comments: [],
    //     },
    //     {
    //       name: "Figure out a structure",
    //       department: "Marketing",
    //       date: "2022-07-18",
    //       assigned: "Josh Sterling",
    //       comments: [],
    //     },
    //     {
    //       name: "Delete unnecessary files",
    //       department: "Accounting",
    //       date: "2022-03-25",
    //       assigned: "Lisa Atkins",
    //       comments: [],
    //     },
    //   ],
    // },
  ],
  activeProject: {
    name: "Transfer Files",
    id: "1",
    initials: "TF",
    color: "#5ec99c",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    launch: "2022-08-26",
    tasks: [
      {
        name: "Decide on what to transfer",
        department: "Accounting",
        date: "2022-03-24",
        assigned: "John Ellie",
        comments: [
          {
            name: "Bob Tyler",
            date: "March 18, 2022 12:54 PM",
            comment: "We might need to change the deadline to a later date.",
          },
          {
            name: "Darrel Kent",
            date: "March 18, 2022 2:17 PM",
            comment:
              "That is not a problem Bob. Just let me know when the new deadline will be.",
          },
        ],
      },
      {
        name: "Call about files",
        department: "Sales",
        date: "2022-03-27",
        assigned: "Tim",
        comments: [],
      },
      {
        name: "Figure out a structure",
        department: "Marketing",
        date: "2022-07-18",
        assigned: "Josh Sterling",
        comments: [],
      },
      {
        name: "Delete unnecessary files",
        department: "Accounting",
        date: "2022-03-25",
        assigned: "Lisa Atkins",
        comments: [
          {
            name: "Sarah Evans",
            date: "March 29, 2022 7:54 AM",
            comment: "Which files should we start with?",
          },
          {
            name: "Dan Thompson",
            date: "March 29, 2022 12:17 PM",
            comment:
              "Start with the oldest files in the system and make sure they have already been backed up.",
          },
          {
            name: "Marry Glass",
            date: "March 29, 2022 2:24 PM",
            comment: "I will be able to help starting tomorrow afternoon.",
          },
          {
            name: "Sarah Evans",
            date: "March 29, 2022 4:31 PM",
            comment: "Thanks Marry",
          },
        ],
      },
      {
        name: "Hire new employee",
        department: "Human Resources",
        date: "2022-03-29",
        assigned: "Tracy Daniels",
        comments: [],
      },
      {
        name: "Track progress",
        department: "Management",
        date: "2022-04-18",
        assigned: "Mark Stein",
        comments: [],
      },
      {
        name: "Sign documents",
        department: "Marketing",
        date: "2022-03-20",
        assigned: "Josh Peck",
        comments: [],
      },
      {
        name: "Meet clients",
        department: "Sales",
        date: "2022-03-08",
        assigned: "Diane",
        comments: [],
      },
      {
        name: "Fix UI",
        department: "Marketing",
        date: "2022-03-09",
        assigned: "Jose Nunez",
        comments: [],
      },
    ],
    completed: [
      {
        name: "Start project",
        department: "Management",
        date: "2022-03-13",
        assigned: "Samuel Eli",
        comments: [],
      },
    ],
  },
  searchQuery: "",
};

export const ProjectDataSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<projectData>) => {
      let newArr = state.projects;
      newArr.push(action.payload);
      state.projects = newArr;
    },
    editProject: (state, action: PayloadAction<editProjectsData>) => {
      state.projects = [
        ...state.projects.map((project) => {
          if (project.name === action.payload.name) {
            return (project = action.payload.project);
          } else {
            return project;
          }
        }),
      ];
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = [
        ...state.projects.filter((project) => {
          return project.name !== action.payload;
        }),
      ];
    },
    changeActiveProject: (state, action: PayloadAction<string>) => {
      state.projects.find((project) => {
        if (project.name === action.payload) {
          return (state.activeProject = project);
        }
      });
    },
    updateProjectData: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.map((project) => {
        if (project.name === action.payload) {
          return (project = state.activeProject);
        } else {
          return project;
        }
      });
    },
    addTask: (state, action: PayloadAction<tasksData>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [...state.activeProject.tasks, action.payload],
      };
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [
          ...state.activeProject.tasks.filter((task) => {
            return task.name !== action.payload;
          }),
        ],
      };
    },
    editTask: (state, action: PayloadAction<edit>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [
          ...state.activeProject.tasks.map((task) => {
            if (task.name === action.payload.name) {
              return (task = action.payload.taskObj);
            } else {
              return task;
            }
          }),
        ],
      };
    },
    addComment: (
      state,
      action: { payload: { name: string; commentData: commentsData } }
    ) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [
          ...state.activeProject.tasks.map((task) => {
            if (task.name === action.payload.name) {
              return {
                ...task,
                comments: [...task.comments, action.payload.commentData],
              };
            } else {
              return task;
            }
          }),
        ],
      };
    },
    deleteComlpletedTask: (state, action: PayloadAction<string>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        completed: [
          ...state.activeProject.completed.filter((task) => {
            return task.name !== action.payload;
          }),
        ],
      };
    },
    completeTask: (state, action: PayloadAction<complete>) => {
      if (!action.payload.complete) {
        state.activeProject = {
          ...state,
          ...state.activeProject,
          tasks: [
            ...state.activeProject.tasks.filter((task) => {
              return task.name !== action.payload.name;
            }),
          ],
          completed: [...state.activeProject.completed, action.payload.taskObj],
        };
      } else {
        state.activeProject = {
          ...state,
          ...state.activeProject,
          tasks: [...state.activeProject.tasks, action.payload.taskObj],
          completed: [
            ...state.activeProject.completed.filter((task) => {
              return task.name !== action.payload.name;
            }),
          ],
        };
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  addNewProject,
  editProject,
  deleteProject,
  changeActiveProject,
  updateProjectData,
  addTask,
  deleteTask,
  editTask,
  deleteComlpletedTask,
  completeTask,
  addComment,
} = ProjectDataSlice.actions;

export default ProjectDataSlice.reducer;

/*
Project Slice


ProjectData Slice
- can set the initial state based off of what is chosen 
- add all of the functions to it 
- somehow have it shoot back to the database


Data Objects
- User {
        id: "1",
        name: "John Doe",
        avatar: "red",
        watching: ["153454354367656gfdbdfbfdbre"], (do notifications later, but have tasks show watching now and have filter for it)
        projects: [{
          name: "Project 1",
          id: "153454354367656gfdbdfbfdbre",
        }] 
      }
- ProjectData


*/
