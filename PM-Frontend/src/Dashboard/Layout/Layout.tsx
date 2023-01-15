import styles from "./Layout.module.scss";
import LeftNav from "./LeftNav/LeftNav";
import TopNav from "./TopNav/TopNav";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.main}>
      <LeftNav />
      <div className={styles["right-container"]}>
        <TopNav />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Layout;
