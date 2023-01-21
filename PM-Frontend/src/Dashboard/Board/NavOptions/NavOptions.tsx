import styles from "./NavOptions.module.scss";

import { Members } from "~/shared/components";
import Search from "./Search/Search";
import Invite from "./Invite/Invite";
import Filter from "./Filter/Filter";
import Settings from "./Settings/Settings";

export type NavOptionsProps = {
  members: string[];
};

const NavOptions = ({ members }: NavOptionsProps) => {
  return (
    <div className={styles.main}>
      {/* <div className={styles.left}> */}
      <Search />
      <Members members={members} />
      <Invite />
      <Filter />
      {/* </div> */}
      <div className={styles.right}>
        <Settings />
      </div>
    </div>
  );
};

export default NavOptions;
