export interface projectData {
  name: string
  initials: string
  color: any
  description: string
  launch: string
  tasks: Array<tasksData>
  completed: Array<tasksData>
  changeActiveTab?: any
  changeDisplayEditProjectModal?: any
  i?: any
}

export interface tasksData {
  name: string
  department: string
  date: any
  assigned: string
  comments: Array<object>
}
