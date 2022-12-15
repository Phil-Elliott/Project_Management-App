import React, { Children } from "react";
import "./Modal.scss";

type ModalProps = {
  display: boolean;
  closeModal: () => void;
  children: React.ReactNode;
};

const Modal = ({ display, closeModal, children }: ModalProps) => {
  return (
    <div className={`modal ${display ? "show" : ""}`} onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
