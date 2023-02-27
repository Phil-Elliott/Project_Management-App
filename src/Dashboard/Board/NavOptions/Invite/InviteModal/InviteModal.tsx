import React, { useEffect, useState } from "react";
import { BsLink45Deg } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { Avatar, Button } from "~/shared/components";
import { User } from "~/shared/interfaces/Projects";
import styles from "./InviteModal.module.scss";

type InviteModalProps = {
  members: User[];
  getUserDetails: (email: string) => void;
  closeModal: () => void;
};

const InviteModal = ({
  members,
  getUserDetails,
  closeModal,
}: InviteModalProps) => {
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    setEmail("");
  }, []);

  const handleClick = () => {
    getUserDetails(email);
    setEmail("");
  };

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <h1>Share Board</h1>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
      </div>
      <div className={styles["email-input"]}>
        <input
          type="text"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={styles["btn-container"]}>
          <button onClick={() => handleClick()}>Share</button>
        </div>
      </div>
      {/* <div className={styles.link}>
        <div className={styles["icon-container"]}>
          <BsLink45Deg className={styles.icon} />
        </div>
        <div>
          <p>Share this board by link</p>
          <p className={styles.create}>Create Link</p>
        </div>
      </div> */}
      <div className={styles.users}>
        {members.map((member) => {
          let image = member.avatar;
          if (image === null) {
            image = member.username[0].toUpperCase();
          }
          return (
            <div className={styles.user} key={member.id}>
              <div className={styles.image}>
                <Avatar avatar={image} />
              </div>
              <p>{member.username}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InviteModal;

/*





*/
