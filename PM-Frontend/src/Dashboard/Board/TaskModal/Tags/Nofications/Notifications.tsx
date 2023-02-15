import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { User } from "~/shared/interfaces/Projects";
import styles from "./Notifications.module.scss";

import { useDispatch } from "react-redux";
import { addWatchingTask, removeWatchingTask } from "~/ProjectSlice";

type NotificationProps = {
  user: User;
  taskData: any;
};

const Notifications = ({ user, taskData }: NotificationProps) => {
  const [watching, setWatching] = useState<string>("Watch");

  const dispatch = useDispatch();

  useEffect(() => {
    // if (user.watching.includes(taskData.id)) {
    //   setWatching("Watching");
    // } else {
    //   setWatching("Watch");
    // }
  }, [taskData.id]);

  const toggleWatching = () => {
    if (watching === "Watch") {
      dispatch(addWatchingTask(taskData.id));
      setWatching("Watching");
    } else {
      dispatch(removeWatchingTask(taskData.id));
      setWatching("Watch");
    }
  };

  return (
    <div className={styles.watch}>
      <h5>Notifications</h5>
      <div className={styles["watch-content"]} onClick={() => toggleWatching()}>
        <FaEye />
        <p>{watching}</p>
      </div>
    </div>
  );
};

export default Notifications;

/*
    Pass user in as a prop
    - If user is watching then show watching
    - If user is not watching then show watch
    - onclick have delete from notifications or add


*/
