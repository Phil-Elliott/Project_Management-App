import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { projectData, tasksData } from "./Interfaces"

export interface ProjectsState {
  projects: Array<projectData>
  activeProject: projectData
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
      name: "Super Cool Project",
      initials: "SC",
      color: "blue",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
      launch: "2022-04-15",
      tasks: [
        {
          name: "Fix Header",
          department: "Marketing",
          date: "2022-03-18",
          assigned: "Josh Peck",
          comments: [],
        },
      ],
      completed: [],
    },
  ],
  activeProject: {
    name: "Super Cool Project",
    initials: "OE",
    color: "blue",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente tempora saepe laborum reprehenderit, autem debitis totam facere accusamus odit minus ipsum dolores itaque laudantium nihil enim quibusdam eaque tenetur omnis.",
    launch: "2022-04-16",
    tasks: [
      {
        name: "Fix Header",
        department: "Marketing",
        date: "2022-03-18",
        assigned: "Josh",
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
  changeActiveProject,
  updateProjectData,
  addTask,
  deleteTask,
  editTask,
  deleteComlpletedTask,
  completeTask,
} = ProjectDataSlice.actions

export default ProjectDataSlice.reducer
