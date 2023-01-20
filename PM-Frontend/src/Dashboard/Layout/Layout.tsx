import styles from "./Layout.module.scss";
import LeftNav from "./LeftNav/LeftNav";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.main}>
      <LeftNav />
      <div className={styles["right-container"]}>{children}</div>
    </div>
  );
};

export default Layout;
