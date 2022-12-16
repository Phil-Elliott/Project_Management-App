import { FaTimes } from "react-icons/fa";
import "./ConfirmModal.scss";

type ConfirmModalProps = {
  display: boolean;
  closeModal: () => void;
  deleteTask: () => void;
};

const ConfirmModal = ({
  display,
  closeModal,
  deleteTask,
}: ConfirmModalProps) => {
  return (
    <div className={`modal ${display ? "show" : ""}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-container">
          <div className="confirm-header">
            <div className="confirm-header-left">
              <h3>Are you sure you want to delete this task?</h3>
            </div>
            <div className="confirm-header-right">
              <FaTimes
                className="confirm-header-icon"
                onClick={() => closeModal()}
              />
            </div>
          </div>
          <div className="confirm-body">
            <p>
              This action cannot be undone. This will permanently delete this
              task and all of its data.
            </p>
          </div>
          <div className="confirm-footer">
            <button
              className="confirm-footer-button"
              onClick={() => closeModal()}
            >
              Cancel
            </button>
            <button
              className="confirm-footer-button"
              onClick={() => deleteTask()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
