import { E } from "chart.js/dist/chunks/helpers.core";
import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { User } from "../../../../../../Interfaces";
import styles from "./Notifications.module.scss";

type NotificationProps = {
  user: User;
  taskData: any;
  addWatching: (id: string) => void;
  removeWatching: (id: string) => void;
};

const Notifications = ({
  user,
  taskData,
  addWatching,
  removeWatching,
}: NotificationProps) => {
  const [watching, setWatching] = useState<string>("Watch");

  useEffect(() => {
    if (user.watching.includes(taskData.id)) {
      setWatching("Watching");
    } else {
      setWatching("Watch");
    }
  }, [taskData.id]);

  const toggleWatching = () => {
    if (watching === "Watch") {
      addWatching(taskData.id);
      setWatching("Watching");
    } else {
      removeWatching(taskData.id);
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
