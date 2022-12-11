export type fakeDataProps = {
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
  order: number;
  name: string;
};

export type TaskProps = {
  id: string;
  name: string;
  assignedTo: string[];
  description: string;
  due: string;
  taskSection: {
    section: string;
    order: number;
  };
  comments: {
    id: string;
    member: string;
    date: string;
    comment: string;
  }[];
};
