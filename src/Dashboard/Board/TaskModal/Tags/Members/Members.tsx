import React, { useEffect, useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Avatar, Popup } from "~/shared/components";
import { TaskProps, User } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../../TaskModal";

import styles from "./Members.module.scss";

type MemberProps = {
  taskData: any;
  members: User[];
  updateMembers: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

type assignedObj = {
  id: string;
  username: string;
  avatar: string;
};

type assigned = {
  data: assignedObj[];
};

const Members = ({ taskData, members, updateMembers }: MemberProps) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [assigned, setAssigned] = useState<any>();
  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setAssigned(taskData.assigned_users);
    if (taskData.assigned_users) {
      setAssignedUsers(
        taskData.assigned_users.map((user: any) => {
          return {
            key: user._id,
            id: user._id,
            username: user.name,
            avatar: user.avatar,
          };
        })
      );
    }
  }, [taskData]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  function removeMember(member: any) {
    let newMembers = assignedUsers && assignedUsers;
    newMembers = newMembers?.filter((m: any) => m.id !== member.id);
    // make a number array with the ids of the members
    let newMemberIds = newMembers?.map((m: any) => m.id);
    if (newMemberIds) {
      updateMembers("assigned_users", newMemberIds);
    }

    // remove from assignedUsers
    setAssignedUsers(assignedUsers.filter((user) => user.id !== member.id));
  }

  function addMember(member: any) {
    if (assignedUsers.find((m: any) => m.id === member.id)) return;
    let newMembers = assigned && assigned;
    newMembers?.push(member);
    let newMemberIds = newMembers?.map((m: any) => m.id);
    if (newMemberIds) {
      updateMembers("assigned_users", newMemberIds);
    }

    // add tp assignedUsers
    setAssignedUsers([
      ...assignedUsers,
      {
        id: member.id,
        username: member.username,
        avatar: member.avatar,
        email: member.email,
      },
    ]);
  }

  return (
    <div className={styles["members-container"]}>
      <h5>Members</h5>
      <div className={styles["members-content"]}>
        <div className={styles["members-selected"]}>
          {assignedUsers &&
            assignedUsers.map((member: any) => {
              let image = member.avatar;
              if (image === null || image === "") {
                image = member.username[0].toUpperCase();
              }
              return (
                <div
                  key={member.id}
                  className={styles.member}
                  onClick={() => removeMember(member)}
                >
                  <Avatar avatar={image} size="med" />
                  <p className={styles["member-name"]}>{member.username}</p>
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
        </div>

        {showSelect && (
          <Popup close={setShowSelect}>
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
            {members.map((member) => {
              if (
                assignedUsers &&
                assignedUsers.find((m: any) => m.id === member.id)
              ) {
                return null;
              } else if (
                member.username.toLowerCase().includes(search.toLowerCase())
              ) {
                let image = member.avatar;
                if (image === null || image === "") {
                  image = member.username[0].toUpperCase();
                }
                return (
                  <div
                    key={member.id}
                    className={styles["member-select-container"]}
                    onClick={() => {
                      addMember(member);
                      setShowSelect(false);
                    }}
                  >
                    <Avatar avatar={image} size="med" />
                    <p className={styles["member-name"]}>{member.username}</p>
                  </div>
                );
              }
            })}
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Members;
