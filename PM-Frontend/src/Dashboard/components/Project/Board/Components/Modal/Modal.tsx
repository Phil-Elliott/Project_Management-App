import React, { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import "./Modal.scss";

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
    <div className={`modal ${display ? "show" : ""}`}>
      <div className="modal-content" {...itemProps}>
        {children}
      </div>
    </div>
  );
};

export default Modal;

/*
   how can i close just the top most modal
   



*/
