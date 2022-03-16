export interface projectData {
  name: string
  initials: string
  color: any
  description: string
  launch: string
  tasks: Array<object>
}

export interface tasksData {
  name: string
  department: string
  date: any
  assigned: string
  comments: Array<object>
}
