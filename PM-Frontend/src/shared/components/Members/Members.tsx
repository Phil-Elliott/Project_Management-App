import { Avatar } from "~/shared/components";
import styles from "./Members.module.scss";

type MembersProps = {
  members: any;
  size?: string;
};

const Members = ({ members, size }: MembersProps) => {
  return (
    <div className={styles["members-container"]}>
      {members.map((member: any, i: number) => {
        let image = member.attributes.avatar;
        if (image === null) {
          image = member.attributes.username[0].toUpperCase();
        }
        return <Avatar avatar={image} size={size} index={i} key={i} />;
      })}
    </div>
  );
};

export default Members;
