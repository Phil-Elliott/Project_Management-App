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
  task: TaskDataProps;
};

const Description = ({
  descriptionData,
  updateTaskData,
  task,
}: DescriptionProps) => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [openEditor, setOpenEditor] = useState(true);

  const handleSave = () => {
    updateTaskData("description", descriptionValue);
    setOpenEditor(false);
  };

  const handleCancel = () => {
    // setDescriptionValue(descriptionData);
    setOpenEditor(false);
  };

  useEffect(() => {
    if (!descriptionData || typeof descriptionData !== "string") {
      setDescriptionValue("");
      setOpenEditor(true);
    } else {
      setDescriptionValue(decodeHtmlEntities(descriptionData));
      setOpenEditor(false);
    }
  }, [task]);

  function decodeHtmlEntities(str?: string) {
    if (typeof str !== "string") return "";

    return str
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
  }

  return (
    <div className={styles.main}>
      <div className={styles.header}>
        <AiOutlineAlignLeft className={styles.icon} />
        <h3>Description</h3>
        {!openEditor && (
          <Button variant={"secondary"} handleClick={() => setOpenEditor(true)}>
            Edit
          </Button>
        )}
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
          className={styles["description-container"]}
          onClick={() => setOpenEditor(true)}
        >
          {descriptionValue ? (
            <div dangerouslySetInnerHTML={{ __html: descriptionValue }} />
          ) : (
            <p>Enter description</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Description;

// <div
//   className={styles["quill-container"]}
//   onClick={() => setOpenEditor(true)}
// >
//   <ReactQuill
//     className={styles.quill}
//     theme="snow"
//     value={descriptionValue}
//     onChange={setDescriptionValue}
//     placeholder="Enter description"
//   />
// </div>
