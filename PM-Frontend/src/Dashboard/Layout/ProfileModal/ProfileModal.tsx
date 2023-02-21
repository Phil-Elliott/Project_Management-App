import React, { useEffect, useState } from "react";
import styles from "./ProfileModal.module.scss";

import { Button } from "~/shared/components";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "~/shared/components/ConfirmModal/ConfirmModal";
import { setJwt } from "~/ProjectSlice";

type ProfileModalProps = {
  closeModal: () => void;
};

const ProfileModal = ({ closeModal }: ProfileModalProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.project.user);

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const toggleDisableCloseModal = (disable: boolean) => {
    setDisableCloseModal(disable);
  };

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

  // sets the users data in the inputs
  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  // deletes the user
  async function handleDeleteUser() {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      localStorage.removeItem("jwt");
      dispatch(setJwt(""));
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  }

  // updates the users data
  async function updateUser() {
    try {
      const res = await axios.put(
        `http://localhost:1337/api/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },

          email: email,
          username: username,
        }
      );
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-header"]}>
        <h3>Edit Profile</h3>
        <FaTimes className={styles.icon} onClick={() => closeModal()} />
      </div>
      <div className={styles["modal-body"]}>
        <div className={styles.content}>
          <h4>Change Email</h4>
          <input
            type="text"
            placeholder="Enter new username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <h4>Change Username</h4>
          <input
            type="text"
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <h4>Change Avatar</h4>
          <input type="file" />
        </div>
        <Button variant="primary" handleClick={() => updateUser()} widthFull>
          Save Changes
        </Button>
        <div className={styles["danger-btn"]}>
          <Button
            variant="danger"
            handleClick={() => toggleDeleteModal()}
            widthFull
          >
            Delete Account
          </Button>
        </div>
      </div>
      <ConfirmModal
        display={displayConfirm}
        closeModal={toggleDeleteModal}
        deleteTask={handleDeleteUser}
        item="profile"
      />
    </div>
  );
};

export default ProfileModal;

/*
    Get errors for this and signin pages (copy from create board)
    Get some avatars that the user can choose from 

    Have the correct data get fetched when the user changes

*/
