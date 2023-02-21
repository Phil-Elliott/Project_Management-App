import styles from "./Layout.module.scss";
import ResponsiveNav from "./ResponsiveNav/ResponsiveNav";
import LeftNav from "./LeftNav/LeftNav";
import { useState } from "react";
import ProfileModal from "./ProfileModal/ProfileModal";
import { Modal } from "~/shared/components";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const [hideNav, setHideNav] = useState<boolean>(true);
  const [display, setDisplay] = useState<boolean>(false);

  // closes modal
  const closeModal = () => {
    setDisplay(false);
  };

  const toggleModal = () => {
    setDisplay(!display);
  };

  const toggleNav = () => {
    setHideNav(!hideNav);
  };

  return (
    <div className={styles.main}>
      <ResponsiveNav toggleNav={toggleNav} toggleModal={toggleModal} />
      <LeftNav hideNav={hideNav} toggleModal={toggleModal} />
      <div className={styles["right-container"]}>{children}</div>
      <Modal display={display} closeModal={closeModal}>
        <ProfileModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default Layout;
