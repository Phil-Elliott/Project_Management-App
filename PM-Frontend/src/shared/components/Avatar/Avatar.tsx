import React from "react";
import styles from "./Avatar.module.scss";

type AvatarProps = {
  avatar: string;
  size?: string;
  index?: number;
};

const Avatar = ({ avatar, size, index }: AvatarProps) => {
  const myStyle = {
    fontSize: size === "med" ? ".75rem" : ".9rem",
    width: size === "med" ? "1.5rem" : "1.75rem",
    height: size === "med" ? "1.5rem" : "1.75rem",
  };

  return (
    <div
      className={styles.avatar}
      style={index ? { ...myStyle, zIndex: index + 1 } : { ...myStyle }}
    >
      {avatar.length === 1 ? (
        <p>{avatar}</p>
      ) : (
        <img src={avatar} alt="user avatar" />
      )}
    </div>
  );
};

export default Avatar;
