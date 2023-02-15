import React, { useState } from "react";
import styles from "./Tags.module.scss";

import { DueDate, Members, Notifications, Priority } from ".";

import { TaskProps, User } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../TaskModal";

type UsersProps = {
  attributes: User;
  id: string;
};

type TagsProps = {
  user: User;
  taskData: any;
  members: User[];
  updateMembers: (member: string, add: boolean) => void;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

const Tags = ({
  user,
  taskData,
  members,
  updateMembers,
  updateTaskData,
}: TagsProps) => {
  return (
    <div className={styles.main}>
      <Members
        taskData={taskData}
        members={members}
        updateMembers={updateTaskData}
      />
      <Notifications
        updateTaskData={updateTaskData}
        user={user}
        taskData={taskData}
      />
      <Priority updateTaskData={updateTaskData} priority={taskData.priority} />
      <DueDate updateTaskData={updateTaskData} due={taskData.due} />
    </div>
  );
};

export default Tags;
