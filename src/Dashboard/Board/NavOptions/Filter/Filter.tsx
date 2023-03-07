import React, { useEffect, useState } from "react";
import {
  BsChevronDown,
  BsFillCalendar2WeekFill,
  BsFillClockFill,
  BsFilter,
} from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import {
  AiFillEye,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
  AiOutlineDown,
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Avatar, Button, Popup } from "~/shared/components";
import styles from "./Filter.module.scss";
import { User } from "~/shared/interfaces/Projects";

type FilterProps = {
  user: User;
  members: User[];
};

const Filter = ({ members, user }: FilterProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);

  useEffect(() => {
    console.log(showSelect);
  }, [showSelect]);

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };

  let userImage = user.avatar;
  if (userImage === null) {
    userImage = user.username[0].toUpperCase();
  }

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => setDisplay(true)}>
        <div className={styles.btn}>
          <BsFilter />
          <p>Filter</p>
        </div>
      </Button>
      <div className={styles["popup-container"]}>
        {display && (
          <Popup close={() => setDisplay(false)}>
            <div className={styles["popup"]}>
              <div className={styles.header}>
                <p>Filter</p>
                <FaTimes
                  className={styles.closeBtn}
                  onClick={() => setDisplay(false)}
                />
              </div>
              <div className={styles.body}>
                <div className={styles.section}>
                  <h5>Watching</h5>
                  <div className={styles.check}>
                    <input type="checkbox" name="watching" id="watching" />
                    <label htmlFor="watching">
                      <AiFillEye className={styles["check-icon"]} />
                      <p>Only show cards I'm watching</p>
                    </label>
                  </div>
                </div>
                <div className={styles.section}>
                  <h5>Members</h5>
                  <div className={styles.check}>
                    <input type="checkbox" name="No members" id="No members" />
                    <label htmlFor="No members">
                      <BsPerson className={styles["check-icon"]} />
                      <p>No members</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="assigned to me"
                      id="assigned to me"
                    />
                    <label htmlFor="assigned to me">
                      <div className={styles["check-icon"]}>
                        <Avatar avatar={userImage} size="med" />
                      </div>
                      <p>Cards assigned to me</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" />
                    <div className={styles["select-container"]}>
                      <div
                        className={styles.select}
                        onClick={() => toggleSelect()}
                      >
                        <p>Select Members</p>
                        <BsChevronDown />
                      </div>
                      <div className={styles.pop}>
                        {showSelect && (
                          <Popup close={() => console.log()}>
                            <div className={styles["select-popup-container"]}>
                              {members.map((member) => {
                                {
                                  let image = member.avatar;
                                  if (image === null) {
                                    image = member.username[0].toUpperCase();
                                  }
                                  return (
                                    <div
                                      key={member.id}
                                      className={
                                        styles["member-select-container"]
                                      }
                                      onClick={() => {
                                        // addMember(member);
                                        // setShowSelect(false);
                                      }}
                                    >
                                      <Avatar avatar={image} size="med" />
                                      <p className={styles["member-name"]}>
                                        {member.username}
                                      </p>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </Popup>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.section}>
                  <h5>Due Date</h5>
                  <div className={styles.check}>
                    <input type="checkbox" name="No dates" id="No dates" />
                    <label htmlFor="No dates">
                      <BsFillCalendar2WeekFill
                        className={styles["check-icon"]}
                      />
                      <p>No dates</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="Overdue" id="Overdue" />
                    <label htmlFor="Overdue">
                      <BsFillClockFill
                        style={{ color: "#F44336" }}
                        className={styles["check-icon"]}
                      />
                      <p>Overdue</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="next day" id="next day" />
                    <label htmlFor="next day">
                      <BsFillClockFill
                        style={{ color: "#FF5722" }}
                        className={styles["check-icon"]}
                      />
                      <p>Due in the next day</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="next week" id="next week" />
                    <label htmlFor="next week">
                      <BsFillClockFill
                        style={{ color: "#FFC107" }}
                        className={styles["check-icon"]}
                      />
                      <p>Due in the next week</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="next month" id="next month" />
                    <label htmlFor="next month">
                      <BsFillClockFill
                        style={{ color: "#00B87C" }}
                        className={styles["check-icon"]}
                      />
                      <p>Due in the next month</p>
                    </label>
                  </div>
                </div>
                <div className={styles.section}>
                  <h5>Priority</h5>
                  <div className={styles.check}>
                    <input type="checkbox" name="urgent" id="urgent" />
                    <label htmlFor="urgent">
                      <AiOutlineArrowUp
                        style={{ color: "#F44336" }}
                        className={styles["check-icon"]}
                      />
                      <p>Urgent</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="high" id="high" />
                    <label htmlFor="high">
                      <AiOutlineArrowUp
                        style={{ color: "#FF5722" }}
                        className={styles["check-icon"]}
                      />
                      <p>High</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="normal" id="normal" />
                    <label htmlFor="normal">
                      <AiOutlineArrowDown
                        style={{ color: "#FFC107" }}
                        className={styles["check-icon"]}
                      />
                      <p>Normal</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input type="checkbox" name="low" id="low" />
                    <label htmlFor="low">
                      <AiOutlineArrowDown
                        style={{ color: "#00B87C" }}
                        className={styles["check-icon"]}
                      />
                      <p>Low</p>
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.footer}>
                <div className={styles.select}>
                  <p>Any match</p>
                  <BsChevronDown />
                </div>
              </div>
            </div>
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Filter;

/*

const priorityOptions = [
  {
    name: "Urgent",
    color: "#F44336",
    icon: <AiOutlineArrowUp />,
  },
  {
    name: "High",
    color: "#FF5722",
    icon: <AiOutlineArrowUp />,
  },
  {
    name: "Normal",
    color: "#FFC107",
    icon: <AiOutlineArrowDown />,
  },
  { name: "Low", color: "#00B87C", icon: <AiOutlineArrowDown /> },
];

1) Make the filter popup
2) Have the buttons save the search parameter to state in redux
3) Do something similar to the search in tasksSection
4) Change the style when there are matches (trello - number, X , dark color)


(use checkboxes)
Members
1) No Members
2) Cards assigned to me
3) Select Members dropdown

Due date
1) No dates
2) Overdue
3) Due in the next day
Could have a dropdown here
4) Due in the next week 
5) Due in the next month

Priority


border
Dropdown
1) Any match
2) Exact match



*/
