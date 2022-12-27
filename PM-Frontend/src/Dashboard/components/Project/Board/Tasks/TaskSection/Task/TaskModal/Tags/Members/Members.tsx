import React, { useRef, useState } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import Avatar from "../../../../../../../../../../shared/components/Avatar/Avatar";
import styles from "./Members.module.scss";
import { useOnClickOutside } from "usehooks-ts";

type MemberProps = {
  taskData: any;
  members: string[];
  addNewMember: (member: string) => void;
  removeMember: (member: string) => void;
};

const Members = ({
  taskData,
  members,
  addNewMember,
  removeMember,
}: MemberProps) => {
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowSelect(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <div className={styles["members-container"]}>
      <h3>Members</h3>
      <div className={styles["members-content"]}>
        {taskData.assignedTo.map((member: string) => {
          return (
            <div className={styles.member} onClick={() => removeMember(member)}>
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
          <div ref={ref} className={styles["member-select"]}>
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => handleSearch(e)}
            />
            {members.map((member) => {
              if (taskData.assignedTo.includes(member)) {
                return null;
              } else if (member.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <div
                    className={styles["member-select-container"]}
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
  );
};

export default Members;
