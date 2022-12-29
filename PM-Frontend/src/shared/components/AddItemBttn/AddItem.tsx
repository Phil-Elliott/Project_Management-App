import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { FaPlus, FaTimes } from "react-icons/fa";
import "./AddItem.scss";
import { Button } from "~/shared/components";

type AddItemProps = {
  addNewItem: any;
  item: string;
  section?: string;
};

const AddItem = ({ addNewItem, item, section }: AddItemProps) => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const ref = useRef(null);

  const handleClickOutside = () => {
    setShowForm(false);
  };
  useOnClickOutside(ref, handleClickOutside);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const addItem = () => {
    const add = () => {
      item === "list"
        ? addNewItem(inputRef.current!.value)
        : addNewItem(inputRef.current!.value, section);
      toggleForm();
    };
    inputRef.current!.value ? add() : null;
  };

  return (
    <div className="add-task-btn">
      {!showForm ? (
        <button
          className="add-task-btn-add"
          onClick={() => toggleForm()}
          style={item === "task" ? { marginTop: "1rem" } : { marginTop: "0" }}
        >
          <FaPlus className="plus-button" />
          <p>{`Add a ${item}`}</p>
        </button>
      ) : (
        <div
          ref={ref}
          className="add-task-form"
          style={
            item === "list"
              ? { padding: "0.5rem 0.75rem" }
              : { paddingTop: "1rem" }
          }
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={`Enter a ${item}`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addItem();
              }
            }}
          />
          <div className="add-task-form-btns">
            <Button
              variant={"primary"}
              handleClick={() => addItem()}
            >{`Add ${item}`}</Button>
            <button
              className="add-task-form-btns-cancel"
              onClick={() => toggleForm()}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddItem;

/*

  
  


*/
