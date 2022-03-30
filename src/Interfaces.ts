export interface projectData {
  name: string
  initials: string
  color: any
  description: string
  launch: string
  tasks: Array<tasksData>
  completed: Array<tasksData>
  changeActiveTab?: any
  openEditModal?: any
  i?: any
}

export interface tasksData {
  name: string
  department: string
  date: any
  assigned: string
  comments: Array<commentsData>
}

export interface commentsData {
  name: string
  date: any
  comment: string
}
