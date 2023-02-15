import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import styles from "./Modal.module.scss";

type ModalProps = {
  display: boolean;
  closeModal: () => void;
  children: React.ReactNode;
  disableCloseModal?: boolean;
};

const Modal = ({
  display,
  closeModal,
  children,
  disableCloseModal,
}: ModalProps) => {
  const ref = useRef(null);
  useOnClickOutside(ref, closeModal);

  const itemProps = !disableCloseModal ? { ref: ref } : {};

  return (
    <div className={`${styles.modal} ${display ? styles.show : ""}`}>
      <div className={styles["modal-content"]} {...itemProps}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
