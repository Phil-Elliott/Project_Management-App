import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { projectData, tasksData } from "./Interfaces"

export interface ProjectsState {
  projects: Array<projectData>
  activeProject: projectData
}

export interface editProjectsData {
  project: projectData
  name: string
}

export interface edit {
  taskObj: tasksData
  name: string
}

export interface complete {
  taskObj: tasksData
  name: string
  complete: boolean
}

const initialState: ProjectsState = {
  projects: [
    {
      name: "Transfer Files",
      initials: "TF",
      color: "black",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-08-26",
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
      initials: "FW",
      color: "Red",
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
    {
      name: "Renovate Office",
      initials: "RO",
      color: "Gray",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-11-02",
      tasks: [
        {
          name: "Decide on what to transfer",
          department: "Accounting",
          date: "2022-03-24",
          assigned: "John Ellie",
          comments: [],
        },

        {
          name: "Delete unnecessary files",
          department: "Accounting",
          date: "2022-03-25",
          assigned: "Lisa Atkins",
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
      completed: [
        {
          name: "Start project",
          department: "Management",
          date: "2022-03-13",
          assigned: "Samuel Eli",
          comments: [],
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
      ],
    },
    {
      name: "Hire New Employees",
      initials: "HE",
      color: "blue",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-05-26",
      tasks: [
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
      ],
    },
    {
      name: "Train Developers",
      initials: "TF",
      color: "green",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-07-06",
      tasks: [
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
          comments: [],
        },
      ],
    },
  ],
  activeProject: {
    name: "Transfering Files",
    initials: "TF",
    color: "black",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    launch: "2022-08-26",
    tasks: [
      {
        name: "Decide on what to transfer",
        department: "Accounting",
        date: "2022-03-24",
        assigned: "John Ellie",
        comments: [],
      },
    ],
    completed: [],
  },
}

export const ProjectDataSlice = createSlice({
  name: "projectData",
  initialState,
  reducers: {
    addNewProject: (state, action: PayloadAction<projectData>) => {
      let newArr = state.projects
      newArr.push(action.payload)
      state.projects = newArr
    },
    editProject: (state, action: PayloadAction<editProjectsData>) => {
      state.projects = [
        ...state.projects.map((project) => {
          if (project.name === action.payload.name) {
            return (project = action.payload.project)
          } else {
            return project
          }
        }),
      ]
    },
    deleteProject: (state, action: PayloadAction<string>) => {
      state.projects = [
        ...state.projects.filter((project) => {
          return project.name !== action.payload
        }),
      ]
    },
    changeActiveProject: (state, action: PayloadAction<string>) => {
      state.projects.find((project) => {
        if (project.name === action.payload) {
          return (state.activeProject = project)
        }
      })
    },
    updateProjectData: (state, action: PayloadAction<string>) => {
      state.projects = state.projects.map((project) => {
        if (project.name === action.payload) {
          return (project = state.activeProject)
        } else {
          return project
        }
      })
    },
    addTask: (state, action: PayloadAction<tasksData>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [...state.activeProject.tasks, action.payload],
      }
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [
          ...state.activeProject.tasks.filter((task) => {
            return task.name !== action.payload
          }),
        ],
      }
    },
    editTask: (state, action: PayloadAction<edit>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        tasks: [
          ...state.activeProject.tasks.map((task) => {
            if (task.name === action.payload.name) {
              return (task = action.payload.taskObj)
            } else {
              return task
            }
          }),
        ],
      }
    },
    deleteComlpletedTask: (state, action: PayloadAction<string>) => {
      state.activeProject = {
        ...state,
        ...state.activeProject,
        completed: [
          ...state.activeProject.completed.filter((task) => {
            return task.name !== action.payload
          }),
        ],
      }
    },
    completeTask: (state, action: PayloadAction<complete>) => {
      if (!action.payload.complete) {
        state.activeProject = {
          ...state,
          ...state.activeProject,
          tasks: [
            ...state.activeProject.tasks.filter((task) => {
              return task.name !== action.payload.name
            }),
          ],
          completed: [...state.activeProject.completed, action.payload.taskObj],
        }
      } else {
        state.activeProject = {
          ...state,
          ...state.activeProject,
          tasks: [...state.activeProject.tasks, action.payload.taskObj],
          completed: [
            ...state.activeProject.completed.filter((task) => {
              return task.name !== action.payload.name
            }),
          ],
        }
      }
    },
  },
})

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
} = ProjectDataSlice.actions

export default ProjectDataSlice.reducer
