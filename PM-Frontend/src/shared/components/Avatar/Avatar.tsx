import React from "react";
import styles from "./Avatar.module.scss";

type AvatarProps = {
  user: string;
  size?: string;
  index?: number;
};

const Avatar = ({ user, size, index }: AvatarProps) => {
  const myStyle = {
    fontSize: size === "med" ? ".8rem" : "1rem",
    width: size === "med" ? "1.5rem" : "2rem",
    height: size === "med" ? "1.5rem" : "2rem",
  };

  return (
    <div
      className={styles.avatar}
      style={index ? { ...myStyle, zIndex: index + 1 } : { ...myStyle }}
    >
      <p>{user[0]}</p>
    </div>
  );
};

export default Avatar;
