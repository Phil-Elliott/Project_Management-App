import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { User } from "~/shared/interfaces/Projects";
import styles from "./Notifications.module.scss";
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
    const isWatched = taskData.watching_users?.some(
      (member: any) => member._id === user.id
    );
    if (isWatched) {
      setWatching("Watching");
    } else {
      setWatching("Watch");
    }
  }, [taskData.watching_users]);

  const toggleWatching = () => {
    if (watching === "Watch") {
      updateTaskData("watching_users", [...taskData.watching_users, user.id]);
      setWatching("Watching");
    } else {
      updateTaskData(
        "watching_users",
        taskData.watching_users.filter(
          (watcher: any) => watcher._id !== user.id
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
