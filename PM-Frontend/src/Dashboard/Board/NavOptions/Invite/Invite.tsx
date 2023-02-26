import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button, Modal } from "~/shared/components";

import styles from "./Invite.module.scss";
import { BsFillPeopleFill } from "react-icons/bs";
import InviteModal from "./InviteModal/InviteModal";
import { User } from "~/shared/interfaces/Projects";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
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
        `http://localhost:1337/api/users?filters[email][$eq]=${email}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      res.data[0].id &&
        addUserToProject(
          res.data[0].id,
          res.data[0].username,
          res.data[0].avatar
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
    try {
      const res = await axios.put(
        `http://localhost:1337/api/projects/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            users: [...usersArr, userId],
          },
        }
      );
      dispatch(
        setProjectUsers([
          ...members,
          {
            id: userId,
            username: usename,
            avatar: avatar,
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
          <p>Invite</p>
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
