import { Members } from "~/shared/components";
import "./NavOptions.scss";
import Search from "./Search/Search";

export type NavOptionsProps = {
  members: string[];
};

const NavOptions = ({ members }: NavOptionsProps) => {
  return (
    <div className="navOptions-container">
      <Search />
      <Members members={members} />
      <button>Invite</button>
      <button>Filter</button>
      {/* <Invite />
      <Filter /> */}
    </div>
  );
};

export default NavOptions;

// - search
//            - test that it returns correct results
//- filter (ame as trello)
//            - modal
//- members
//            - test that it returns all of the members invited to project
// - invite bttn
//            - modal (invite by email like trello)
//            - test that it sends invite to member
