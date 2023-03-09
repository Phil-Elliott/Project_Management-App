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
} from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { Avatar, Button, Popup } from "~/shared/components";
import styles from "./Filter.module.scss";
import { User } from "~/shared/interfaces/Projects";

type FilterProps = {
  user: User;
  members: User[];
};

type FilterData = {
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

const Filter = ({ members, user }: FilterProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [showSelect, setShowSelect] = useState<boolean>(false);
  const [showSelect2, setShowSelect2] = useState<boolean>(false);
  const [filterData, setFilterData] = useState<FilterData>({
    watching: false,
    noMembers: false,
    assignedToMe: false,
    assignedToUsers: [],
    noDates: false,
    overdue: false,
    nextDay: false,
    nextWeek: false,
    nextMonth: false,
    urgent: false,
    high: false,
    normal: false,
    low: false,
    exact: false,
  });

  useEffect(() => {
    console.log(filterData);
  }, [filterData]);

  const toggleSelect = () => {
    setShowSelect(!showSelect);
  };

  const toggleSelect2 = () => {
    setShowSelect2(!showSelect2);
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
                    <input
                      type="checkbox"
                      name="watching"
                      id="watching"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          watching: e.target.checked,
                        })
                      }
                      checked={filterData.watching}
                    />
                    <label htmlFor="watching">
                      <AiFillEye className={styles["check-icon"]} />
                      <p>Only show cards I'm watching</p>
                    </label>
                  </div>
                </div>

                <div className={styles.section}>
                  <h5>Members</h5>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="No members"
                      id="No members"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          noMembers: e.target.checked,
                        })
                      }
                      checked={filterData.noMembers}
                    />
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
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          assignedToMe: e.target.checked,
                        })
                      }
                      checked={filterData.assignedToMe}
                    />
                    <label htmlFor="assigned to me">
                      <div className={styles["check-icon"]}>
                        <Avatar avatar={userImage} size="med" />
                      </div>
                      <p>Cards assigned to me</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="assigned to users"
                      id="assigned to users"
                    />
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
                                  if (member.id !== user.id) {
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
                                      >
                                        <input
                                          type="checkbox"
                                          name={member.id}
                                          id={member.id}
                                          onChange={(e) => {
                                            if (e.target.checked) {
                                              setFilterData({
                                                ...filterData,
                                                assignedToUsers: [
                                                  ...filterData.assignedToUsers,
                                                  member.id,
                                                ],
                                              });
                                            } else {
                                              setFilterData({
                                                ...filterData,
                                                assignedToUsers:
                                                  filterData.assignedToUsers.filter(
                                                    (id) => id !== member.id
                                                  ),
                                              });
                                            }
                                          }}
                                          checked={filterData.assignedToUsers.includes(
                                            member.id
                                          )}
                                        />
                                        <label htmlFor={member.id}>
                                          <div className={styles["check-icon"]}>
                                            <Avatar avatar={image} size="med" />
                                          </div>
                                          <p className={styles["member-name"]}>
                                            {member.username}
                                          </p>
                                        </label>
                                      </div>
                                    );
                                  }
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
                    <input
                      type="checkbox"
                      name="No dates"
                      id="No dates"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          noDates: e.target.checked,
                        })
                      }
                      checked={filterData.noDates}
                    />
                    <label htmlFor="No dates">
                      <BsFillCalendar2WeekFill
                        className={styles["check-icon"]}
                      />
                      <p>No dates</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="Overdue"
                      id="Overdue"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          overdue: e.target.checked,
                        })
                      }
                      checked={filterData.overdue}
                    />
                    <label htmlFor="Overdue">
                      <BsFillClockFill
                        style={{ color: "#F44336" }}
                        className={styles["check-icon"]}
                      />
                      <p>Overdue</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="next day"
                      id="next day"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          nextDay: e.target.checked,
                        })
                      }
                      checked={filterData.nextDay}
                    />
                    <label htmlFor="next day">
                      <BsFillClockFill
                        style={{ color: "#FF5722" }}
                        className={styles["check-icon"]}
                      />
                      <p>Due in the next day</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="next week"
                      id="next week"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          nextWeek: e.target.checked,
                        })
                      }
                      checked={filterData.nextWeek}
                    />
                    <label htmlFor="next week">
                      <BsFillClockFill
                        style={{ color: "#FFC107" }}
                        className={styles["check-icon"]}
                      />
                      <p>Due in the next week</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="next month"
                      id="next month"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          nextMonth: e.target.checked,
                        })
                      }
                      checked={filterData.nextMonth}
                    />
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
                    <input
                      type="checkbox"
                      name="urgent"
                      id="urgent"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          urgent: e.target.checked,
                        })
                      }
                      checked={filterData.urgent}
                    />
                    <label htmlFor="urgent">
                      <AiOutlineArrowUp
                        style={{ color: "#F44336" }}
                        className={styles["check-icon"]}
                      />
                      <p>Urgent</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="high"
                      id="high"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          high: e.target.checked,
                        })
                      }
                    />
                    <label htmlFor="high">
                      <AiOutlineArrowUp
                        style={{ color: "#FF5722" }}
                        className={styles["check-icon"]}
                      />
                      <p>High</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="normal"
                      id="normal"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          normal: e.target.checked,
                        })
                      }
                      checked={filterData.normal}
                    />
                    <label htmlFor="normal">
                      <AiOutlineArrowDown
                        style={{ color: "#FFC107" }}
                        className={styles["check-icon"]}
                      />
                      <p>Normal</p>
                    </label>
                  </div>
                  <div className={styles.check}>
                    <input
                      type="checkbox"
                      name="low"
                      id="low"
                      onChange={(e) =>
                        setFilterData({
                          ...filterData,
                          low: e.target.checked,
                        })
                      }
                      checked={filterData.low}
                    />
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
                <div className={styles.select} onClick={() => toggleSelect2()}>
                  <p>Any match</p>
                  <BsChevronDown />
                </div>
                <div className={styles["pop-bottom"]}>
                  {showSelect2 && (
                    <Popup close={() => console.log()}>
                      <div
                        className={styles["footer-select-container"]}
                        style={
                          !filterData.exact
                            ? { background: "#1c4e80", color: "white" }
                            : {}
                        }
                        onClick={() => {
                          setFilterData({
                            ...filterData,
                            exact: false,
                          });
                        }}
                      >
                        <h5>Any matches</h5>
                        <p>Matches any label and any member</p>
                      </div>
                      <div
                        className={styles["footer-select-container"]}
                        style={
                          filterData.exact
                            ? { background: "#1c4e80", color: "white" }
                            : {}
                        }
                        onClick={() => {
                          setFilterData({
                            ...filterData,
                            exact: true,
                          });
                        }}
                      >
                        <h5>Exact match</h5>
                        <p>Matches all labels and all members</p>
                      </div>
                    </Popup>
                  )}
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

Collect Data
  Could have a state for each one of these
  Could also have a state with an object that includes each one of these
  Work on getting the selects to work last

  Any matches - Just make sure the tasks match at least of of them and include the search in some way
  Exact match - Make sure the tasks match all of them and include the search in some way


Select members menu
  1) Have the select show "1 member selected"
  2) Check the box if a member is selected
  3) If checkbox is selected from blank, check all
  4) If checkbox is selected from all, uncheck all



*/
