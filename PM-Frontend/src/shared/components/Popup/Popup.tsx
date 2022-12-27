import React, { useRef } from "react";
import styles from "./Popup.module.scss";
import { useOnClickOutside } from "usehooks-ts";

type PopupProps = {
  children: React.ReactNode;
  close: (value: boolean) => void;
};

const Popup = ({ children, close }: PopupProps) => {
  const ref = useRef(null);

  const handleClickOutside = () => {
    close(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className={styles.main}>
      {children}
    </div>
  );
};

export default Popup;
