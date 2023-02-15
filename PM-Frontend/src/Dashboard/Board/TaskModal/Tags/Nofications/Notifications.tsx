import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { User } from "~/shared/interfaces/Projects";
import styles from "./Notifications.module.scss";

import { addWatchingTask, removeWatchingTask } from "~/ProjectSlice";
import { TaskDataProps } from "../../TaskModal";

type NotificationProps = {
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
  user: User;
  taskData: any;
};

const Notifications = ({
  updateTaskData,
  user,
  taskData,
}: NotificationProps) => {
  const [watching, setWatching] = useState<string>("Watch");

  useEffect(() => {
    console.log(
      taskData.watching_users?.data.filter(
        (watcher: any) => watcher.id !== user.id
      )
    );
    const isWatched = taskData.watching_users?.data.some(
      (member: any) => member.id === user.id
    );
    if (isWatched) {
      setWatching("Watching");
    } else {
      setWatching("Watch");
    }
  }, [taskData.watching_users]);

  const toggleWatching = () => {
    if (watching === "Watch") {
      updateTaskData("watching_users", [
        ...taskData.watching_users.data,
        user.id,
      ]);
      setWatching("Watching");
    } else {
      updateTaskData(
        "watching_users",
        taskData.watching_users?.data.filter(
          (watcher: any) => watcher.id !== user.id
        )
      );
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

// useEffect(() => {
//   // if (user.watching.includes(taskData.id)) {
//   //   setWatching("Watching");
//   // } else {
//   //   setWatching("Watch");
//   // }
// }, [taskData.id]);
