import React, { useState } from "react";
import styles from "./Tags.module.scss";
import Members from "./Members/Members";
import Notifications from "./Nofications/Notifications";
import Priority from "./Priority/Priority";
import DueDate from "./DueDate/DueDate";
import { TaskProps, User } from "~/shared/interfaces/Projects";

type TagsProps = {
  user: User;
  taskData: any;
  members: string[];
  updateMembers: (member: string, add: boolean) => void;
  updateTaskData: <T extends keyof TaskProps>(
    type: T,
    value: TaskProps[T]
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
        updateMembers={updateMembers}
      />
      <Notifications user={user} taskData={taskData} />
      <Priority updateTaskData={updateTaskData} priority={taskData.priority} />
      <DueDate updateTaskData={updateTaskData} due={taskData.due} />
    </div>
  );
};

export default Tags;

/*
  Maybe move all of the tags to the right
  - Copy design from other app
  - Need a drop down to select the members


  Have it so you can only add members from the project members


*/
