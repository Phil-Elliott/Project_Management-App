import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "~/shared/components";

import styles from "./Description.module.scss";
import { AiOutlineAlignLeft } from "react-icons/ai";
import { TaskDataProps } from "../TaskModal";

type DescriptionProps = {
  descriptionData: string;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

const Description = ({ descriptionData, updateTaskData }: DescriptionProps) => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [openEditor, setOpenEditor] = useState(true);

  const handleSave = () => {
    updateTaskData("description", descriptionValue);
    setOpenEditor(false);
  };

  const handleCancel = () => {
    setDescriptionValue(descriptionData);
    setOpenEditor(false);
  };

  useEffect(() => {
    if (descriptionData === "" || descriptionData === null) {
      setDescriptionValue("");
      setOpenEditor(true);
    } else {
      setDescriptionValue(descriptionData);
      setOpenEditor(false);
    }
  }, [descriptionData]);

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <AiOutlineAlignLeft className={styles.icon} />
        <h3>Description</h3>
      </div>
      {openEditor ? (
        <div className={styles["quill-container"]}>
          <ReactQuill
            className={styles.quill}
            theme="snow"
            value={descriptionValue}
            onChange={setDescriptionValue}
            placeholder="Enter description"
          />
          <div className={styles.buttons}>
            <Button space={true} variant={"primary"} handleClick={handleSave}>
              Save
            </Button>
            <Button variant={"secondary"} handleClick={handleCancel}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={styles["quill-container"]}
          onClick={() => setOpenEditor(true)}
        >
          <ReactQuill
            className={styles.quill}
            theme="snow"
            value={descriptionValue}
            onChange={setDescriptionValue}
            placeholder="Enter description"
          />
        </div>
      )}
    </div>
  );
};

export default Description;

// <div
//   className={styles["description-container"]}
//   onClick={() => setOpenEditor(true)}
// >
//   {descriptionValue ? (
//     <div dangerouslySetInnerHTML={{ __html: descriptionValue }} />
//   ) : (
//     <p>Enter description</p>
//   )}
// </div>
