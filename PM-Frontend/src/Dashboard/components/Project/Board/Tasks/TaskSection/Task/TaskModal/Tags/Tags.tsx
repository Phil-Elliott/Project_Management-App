import React, { useState } from "react";
import styles from "./Tags.module.scss";
import { Members } from "../../../../../NavOptions";
import { FaPlus, FaEye, FaTimes } from "react-icons/fa";
import Avatar from "../../../../../../../../../shared/components/Avatar/Avatar";

type TagsProps = {
  taskData: any;
  members: string[];
  addNewMember: (member: string) => void;
  removeMember: (member: string) => void;
};

const Tags = ({ taskData, members, addNewMember, removeMember }: TagsProps) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);

  return (
    <div className={styles.main}>
      <div className={styles["members-container"]}>
        <h3>Members</h3>
        <div className={styles["members-content"]}>
          {taskData.assignedTo.map((member: string) => {
            return (
              <div
                className={styles.member}
                onClick={() => removeMember(member)}
              >
                <Avatar user={member[0]} size="med" />
                <p className={styles["member-name"]}>{member}</p>
                <FaTimes className={styles["cross-icon"]} />
              </div>
            );
          })}
          <div
            className={styles["add-member"]}
            onClick={() => setShowSelect(true)}
          >
            <FaPlus className={styles["plus-icon"]} />
            <p>Add</p>
          </div>
          {showSelect && (
            <div className={styles["member-select"]}>
              {members.map((member) => {
                if (taskData.assignedTo.includes(member)) {
                  return null;
                } else {
                  return (
                    <div
                      onClick={() => {
                        addNewMember(member);
                        setShowSelect(false);
                      }}
                    >
                      <Avatar user={member[0]} size="med" />
                      <p className={styles["member-name"]}>{member}</p>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
      <div className={styles.watch}>
        <p>Notifications</p>
        <div className={styles["watch-content"]}>
          <FaEye />
          <p>Watch</p>
        </div>
      </div>
      <div className={styles["priority"]}>
        <p>Priority</p>
        <div className={styles["priority-content"]}>
          <p>Normal</p>
        </div>
      </div>
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
