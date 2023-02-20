import styles from "./Layout.module.scss";
import ResponsiveNav from "./ResponsiveNav/ResponsiveNav";
import LeftNav from "./LeftNav/LeftNav";
import { useState } from "react";
import { Button, Modal } from "~/shared/components";
import { FaTimes } from "react-icons/fa";

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
        <div className={styles["modal-container"]}>
          <div className={styles["modal-header"]}>
            <h3>Edit Profile</h3>
            <FaTimes className={styles.icon} onClick={() => closeModal()} />
          </div>
          <div className={styles["modal-body"]}>
            <div className={styles.content}>
              <h4>Change Email</h4>
              <input type="text" placeholder="Enter new username" />
              <h4>Change Username</h4>
              <input type="text" placeholder="Enter new username" />
              <h4>Change Avatar</h4>
              <input type="file" />
            </div>
            <Button
              variant="primary"
              handleClick={() => console.log("delete")}
              widthFull
            >
              Save Changes
            </Button>
            <div className={styles["danger-btn"]}>
              <Button
                variant="danger"
                handleClick={() => console.log("delete")}
                widthFull
              >
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;

/*

2) User profile
    - Make a modal for editing the user profile (change username, change avatar, change password, delete account)



*/
