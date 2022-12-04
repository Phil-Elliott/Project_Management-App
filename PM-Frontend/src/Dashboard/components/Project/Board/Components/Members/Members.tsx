import React from "react";
import { NavOptionsProps } from "../../NavOptions/NavOptions";
import "./Members.scss";

const Members = ({ members }: NavOptionsProps) => {
  return (
    <div className="members-container">
      {members.map((member) => {
        return <div className="member">{member[0]}</div>;
      })}
    </div>
  );
};

export default Members;

/*
  Start by passing in the members data as a prop
  Map through the members data and display the members as a circle
  need to know when one of them is clicked (but can do that later) - to filter the tasks
*/
