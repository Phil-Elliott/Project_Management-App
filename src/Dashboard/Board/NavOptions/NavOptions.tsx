import styles from "./NavOptions.module.scss";

import { Members } from "~/shared/components";
import Search from "./Search/Search";
import Invite from "./Invite/Invite";
import Filter from "./Filter/Filter";
import Settings from "./Settings/Settings";
import { ProjectDataProps, User } from "~/shared/interfaces/Projects";

type NavOptionsProps = {
  user: User;
  members: User[];
  projectId: string;
  projectData: ProjectDataProps;
};

const NavOptions = ({
  members,
  projectId,
  projectData,
  user,
}: NavOptionsProps) => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.left}> */}
      <Search projectId={projectId} />
      {members && <Members members={members} />}
      <Invite members={members} projectId={projectId} />
      <Filter members={members} user={user} projectId={projectId} />
      {/* </div> */}
      <div className={styles.right}>
        <Settings projectData={projectData} />
      </div>
    </div>
  );
};

export default NavOptions;
