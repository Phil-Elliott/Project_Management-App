import { FaTimes } from "react-icons/fa";
import { Button } from "~/shared/components";
import "./ConfirmModal.scss";

type ConfirmModalProps = {
  display: boolean;
  closeModal: () => void;
  deleteTask: () => void;
  item: string;
};

const ConfirmModal = ({
  display,
  closeModal,
  deleteTask,
  item,
}: ConfirmModalProps) => {
  return (
    <div className={`modal ${display ? "show" : ""}`}>
      <div
        className="modal-content modal-confirm-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="confirm-container">
          <div className="confirm-header">
            <h3>Are you sure you want to delete this {item}?</h3>
          </div>
          <div className="confirm-body">
            <p>Once you delete, it's gone for good.</p>
          </div>
          <div className="confirm-footer">
            <Button
              space={true}
              variant="danger"
              handleClick={() => deleteTask()}
            >
              Delete
            </Button>
            <Button variant="secondary" handleClick={() => closeModal()}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
