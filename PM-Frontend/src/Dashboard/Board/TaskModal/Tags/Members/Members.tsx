import React, { useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { Avatar, Popup } from "~/shared/components";
import { User } from "~/shared/interfaces/Projects";

import styles from "./Members.module.scss";

type UsersProps = {
  attributes: User;
  id: string;
};

type MemberProps = {
  taskData: any;
  members: User[];
  updateMembers: (member: string, add: boolean) => void;
};

const Members = ({ taskData, members, updateMembers }: MemberProps) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className={styles["members-container"]}>
      <h5>Members</h5>
      <div className={styles["members-content"]}>
        <div className={styles["members-selected"]}>
          {members.map((member) => {
            let image = member.avatar;
            if (image === null) {
              image = member.username[0].toUpperCase();
            }
            return (
              <div
                key={member.username}
                className={styles.member}
                // onClick={() => updateMembers(member, false)}
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
              if (taskData.assignedTo.includes(member)) {
                return null;
              } else if (
                member.username.toLowerCase().includes(search.toLowerCase())
              ) {
                let image = member.avatar;
                if (image === null) {
                  image = member.username[0].toUpperCase();
                }
                return (
                  <div
                    className={styles["member-select-container"]}
                    onClick={() => {
                      // updateMembers(member, true);
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
