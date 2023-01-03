export type ProjectDataProps = {
  name: string;
  id: string;
  background: string;
  members: string[];
  notes: Note[];
  tasksSections: TasksSections[];
  tasks: TaskProps[];
};

export type Note = {
  id: string;
  title: string;
  member: string;
  description: string;
  urgency: string;
  comments: {
    id: string;
    member: string;
    comment: string;
  }[];
};

export type TasksSections = {
  id: string;
  name: string;
  tasks: string[];
};

export type TaskProps = {
  id: string;
  name: string;
  assignedTo: string[];
  description: string;
  priority: string;
  due: string;
  comments: {
    id: string;
    member: string;
    date: string;
    comment: string;
  }[];
};

export type User = {
  id: string;
  name: string;
  avatar: string;
  watching: string[];
};
