import styles from "./NavOptions.module.scss";

import { Members } from "~/shared/components";
import Search from "./Search/Search";
import Invite from "./Invite/Invite";
import Filter from "./Filter/Filter";
import Settings from "./Settings/Settings";
import { User } from "~/shared/interfaces/Projects";

type NavOptionsProps = {
  members: User[];
  projectId: string;
};

const NavOptions = ({ members, projectId }: NavOptionsProps) => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.left}> */}
      <Search />
      {members && <Members members={members} />}
      <Invite members={members} projectId={projectId} />
      <Filter />
      {/* </div> */}
      <div className={styles.right}>
        <Settings />
      </div>
    </div>
  );
};

export default NavOptions;
