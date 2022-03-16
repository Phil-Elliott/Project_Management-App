export interface projectData {
  name: string
  initials: string
  color: any
  description: string
  launch: string
  tasks: Array<tasksData>
  completed: Array<tasksData>
}

export interface tasksData {
  name: string
  department: string
  date: any
  assigned: string
  comments: Array<object>
}
