import React, { useEffect, useState } from "react";
import styles from "./ProfileModal.module.scss";

import { Button } from "~/shared/components";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "~/shared/components/ConfirmModal/ConfirmModal";
import { setJwt, setUser } from "~/ProjectSlice";

const availableAvatars = [
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903616/PM-App/avatars/tea_kkkgqj.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903616/PM-App/avatars/road_ns8aej.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903615/PM-App/avatars/puzzle_caw0nr.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903615/PM-App/avatars/lightbulb_ko0ghd.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903594/PM-App/avatars/dog_djb8qa.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903584/PM-App/avatars/coffee_dbcz5s.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903577/PM-App/avatars/cat_ylli7r.jpg",
  "https://res.cloudinary.com/djdxd5akb/image/upload/v1694903561/PM-App/avatars/apple_td8fjk.jpg",
];

type ProfileModalProps = {
  closeModal: () => void;
};

const ProfileModal = ({ closeModal }: ProfileModalProps) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [avatarState, setAvatarState] = useState<string>("");

  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.project.user);

  useEffect(() => {
    if (user) {
      if (user.avatar) {
        setAvatarState(user.avatar);
      }
    }
  }, [user]);

  const handleBackground = (e: any) => {
    console.log(e.currentTarget.src);
    setAvatarState(e.currentTarget.src);
  };

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
      const response = await axios.delete(
        `https://pm-server-production.up.railway.app/api/v1/users/deleteMe`,
        { withCredentials: true }
      );
      localStorage.removeItem("jwt");
      dispatch(setJwt(""));
      navigate("/signin");
    } catch (error) {
      console.log(error);
    }
  }

  // resets changes when closed
  const resetChanges = () => {
    setEmail(user.email);
    setUsername(user.username);
    user.avatar && setAvatarState(user.avatar);
    closeModal();
  };

  // updates the users data
  async function updateUser() {
    const payload = {
      email: email,
      name: username,
      avatar: avatarState,
    };

    try {
      const response = await axios.patch(
        `https://pm-server-production.up.railway.app/api/v1/users/updateMe`,
        payload,
        { withCredentials: true }
      );
      dispatch(
        setUser({
          _id: user.id,
          email: email,
          name: username,
          avatar: avatarState,
        })
      );
      resetChanges();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles["modal-container"]}>
      <div className={styles["modal-header"]}>
        <h3>Edit Profile</h3>
        <FaTimes className={styles.icon} onClick={() => resetChanges()} />
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
          <div className={styles.background}>
            <p>Avatars</p>
            <div className={styles.images}>
              {availableAvatars.map((avatar, index) => {
                const avatarSrc = avatar.split("/").pop();
                const userAvatar = avatarState.split("/").pop();

                return (
                  <div key={index}>
                    <img
                      src={avatar}
                      onClick={(e) => handleBackground(e)}
                      style={
                        avatarSrc === userAvatar
                          ? { border: "2px solid #007bff" }
                          : {}
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
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
