// export type ProjectDataProps = {
//   name: string;
//   id: string;
//   background: string;
//   members: string[];
//   notes: Note[];
//   tasksSections: TasksSections[];
//   tasks: TaskProps[];
// };

export type ProjectDataProps = {
  _id: string;
  title: string;
  background: string;
};

export type ProjectProps = {
  id: string;
  title: string;
  background: string;
  // comments
};

export type Comments = {
  content: string;
};

// export type SectionProps = {
//   attributes: {
//     title: string;
//   };
//   id: string;
// };

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
  title: string;
  order: number;
};

export type TaskProps = {
  id: string;
  title: string;
  description: string;
  due: string;
  priority: string;
  order: number;
  comments: any;
  watching: any;
  assigned: any;
};

export type ModalTaskProps = {
  id: string;
  task: TaskProps;
};

export type User = {
  id: string;
  username: string;
  avatar: string | null;
  email: string;
};

export type FilterData = {
  watching: boolean;
  noMembers: boolean;
  assignedToMe: boolean;
  assignedToUsers: string[];
  noDates: boolean;
  overdue: boolean;
  nextDay: boolean;
  nextWeek: boolean;
  nextMonth: boolean;
  urgent: boolean;
  high: boolean;
  normal: boolean;
  low: boolean;
  exact: boolean;
};
