import React, { useState } from "react";
import styles from "./Tags.module.scss";
import Members from "./Members/Members";
import Notifications from "./Nofications/Notifications";
import { User } from "../../../../../Interfaces";
import Priority from "./Priority/Priority";

type TagsProps = {
  user: User;
  taskData: any;
  members: string[];
  addNewMember: (member: string) => void;
  removeMember: (member: string) => void;
  addWatching: (id: string) => void;
  removeWatching: (id: string) => void;
};

const Tags = ({
  user,
  taskData,
  members,
  addNewMember,
  removeMember,
  addWatching,
  removeWatching,
}: TagsProps) => {
  return (
    <div className={styles.main}>
      <Members
        taskData={taskData}
        members={members}
        addNewMember={addNewMember}
        removeMember={removeMember}
      />
      <Notifications
        user={user}
        taskData={taskData}
        addWatching={addWatching}
        removeWatching={removeWatching}
      />
      <Priority />
      <div className={styles["due-date"]}>
        <p>Due Date</p>
        <div className={styles["due-date-content"]}>
          <p>None</p>
        </div>
      </div>
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
