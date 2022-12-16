import { NavOptionsProps } from "../../NavOptions/NavOptions";
import "./Members.scss";

type MembersProps = {
  members: NavOptionsProps["members"];
  size?: string;
};

const Members = ({ members, size }: MembersProps) => {
  const myStyle = {
    fontSize: size === "med" ? ".8rem" : "1rem",
    width: size === "med" ? "1.5rem" : "2rem",
    height: size === "med" ? "1.5rem" : "2rem",
  };

  return (
    <div className="members-container">
      {members.map((member, i) => {
        return (
          <div
            key={i}
            className="member"
            style={{ ...myStyle, zIndex: -i + 5 }}
          >
            <p>{member[0]}</p>
          </div>
        );
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
