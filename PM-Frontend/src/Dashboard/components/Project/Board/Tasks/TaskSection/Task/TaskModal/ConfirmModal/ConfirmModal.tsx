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
      <div
        className="modal-content modal-confirm-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-container">
          <div className="confirm-header">
            <h3>Are you sure you want to delete this task?</h3>
          </div>
          <div className="confirm-body">
            <p>Once you delete, it's gone for good.</p>
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
