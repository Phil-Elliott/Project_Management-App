import React, { useEffect, useState } from "react";
import styles from "./Avatar.module.scss";
import { StyledTooltip } from "~/shared/components/Tooltips/Tooltip";

type AvatarProps = {
  avatar: string;
  size?: string;
  index?: number;
  username?: string;
};

const Avatar = ({ avatar, size, index, username }: AvatarProps) => {
  const myStyle = {
    fontSize: size === "med" ? ".75rem" : ".9rem",
    width: size === "med" ? "1.75rem" : "1.75rem",
    height: size === "med" ? "1.5rem" : "1.75rem",
  };

  return (
    <StyledTooltip title={username}>
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
    </StyledTooltip>
  );
};

export default Avatar;

/*

Show background until image is loaded


*/
