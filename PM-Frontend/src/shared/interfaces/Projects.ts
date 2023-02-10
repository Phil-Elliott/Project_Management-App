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
  id: string;
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

export type SectionProps = {
  attributes: {
    title: string;
  };
  id: string;
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
  title: string;
  description: string;
  due: string;
  priority: string;
};

export type ModalTaskProps = {
  id: string;
  task: TaskProps;
};

export type User = {
  id: string;
  username: string;
  avatar: string;
};
