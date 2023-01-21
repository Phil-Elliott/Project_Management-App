import { NavOptionsProps } from "~/Dashboard/Board/NavOptions/NavOptions";
import { Avatar } from "~/shared/components";
import styles from "./Members.module.scss";

type MembersProps = {
  members: NavOptionsProps["members"];
  size?: string;
};

const Members = ({ members, size }: MembersProps) => {
  return (
    <div className={styles["members-container"]}>
      {members.map((member, i) => {
        return <Avatar user={member} size={size} index={i} key={i} />;
      })}
    </div>
  );
};

export default Members;
