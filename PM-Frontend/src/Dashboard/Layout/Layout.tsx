import styles from "./Layout.module.scss";
import ResponsiveNav from "./ResponsiveNav/ResponsiveNav";
import LeftNav from "./LeftNav/LeftNav";
import { useState } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [hideNav, setHideNav] = useState<boolean>(true);

  const toggleNav = () => {
    setHideNav(!hideNav);
  };

  return (
    <div className={styles.main}>
      <ResponsiveNav toggleNav={toggleNav} />
      <LeftNav hideNav={hideNav} />
      <div className={styles["right-container"]}>{children}</div>
    </div>
  );
};

export default Layout;

/*




Fix background problem
Bottom arrow should always show
*/
