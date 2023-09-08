import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Modal } from "~/shared/components";

import styles from "./Invite.module.scss";
import { BsFillPeopleFill } from "react-icons/bs";
import InviteModal from "./InviteModal/InviteModal";
import { User } from "~/shared/interfaces/Projects";
import { useDispatch } from "react-redux";
import { setProjectUsers } from "~/ProjectSlice";

type InviteProps = {
  members: User[];
  projectId: string;
};

const Invite = ({ members, projectId }: InviteProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [usersArr, setUsersArr] = useState<string[]>([]);

  const dispatch = useDispatch();

  // make an array of the users id's
  useEffect(() => {
    setUsersArr(members.map((member) => member.id));
  }, [members]);

  // Get the users details
  async function getUserDetails(email: string) {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/users/getUserByEmail/${email}`,
        {
          withCredentials: true,
        }
      );
      console.log(res);
      res.data.data.id &&
        addUserToProject(
          res.data.data.id,
          res.data.data.name,
          res.data.data.avatar
        );
    } catch (error) {
      console.log(error);
    }
  }

  // Add user to project
  async function addUserToProject(
    userId: string,
    usename: string,
    avatar: string | null
  ) {
    const payload = {
      userId: userId,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/projects/${projectId}/add-user`,
        payload,
        { withCredentials: true }
      );

      dispatch(
        setProjectUsers([
          ...members,
          {
            id: userId,
            username: usename,
            avatar: avatar,
            email: "",
          },
        ])
      );
    } catch (err) {
      console.log(err);
    }
  }

  // closes modal
  const closeModal = () => {
    setDisplay(false);
  };

  // displays the modal
  const changeModalDisplay = () => {
    setDisplay(!display);
  };

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => changeModalDisplay()}>
        <div className={styles.btn}>
          <BsFillPeopleFill />
          <p>Share</p>
        </div>
      </Button>
      <Modal display={display} closeModal={closeModal}>
        <InviteModal
          members={members}
          getUserDetails={getUserDetails}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};

export default Invite;

/*

 Now
  1) Update members state when a user is added
         - Make a redux call and update member state
         - Maybe use that state instead of passing it in (updates automatically)
         - Have the state call as a response to the put request if successful

 
  Later
  1) Give admin permissions and and ability to remove people from the board
  2) Make a link to add user to the board


*/
