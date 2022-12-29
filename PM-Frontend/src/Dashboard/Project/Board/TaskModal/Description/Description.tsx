import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "~/shared/components";

import styles from "./Description.module.scss";

type DescriptionProps = {
  descriptionData: string;
  changeDescription: (value: string) => void;
};

const Description = ({
  descriptionData,
  changeDescription,
}: DescriptionProps) => {
  const [descriptionValue, setDescriptionValue] = useState("");
  const [openEditor, setOpenEditor] = useState(false);

  const handleSave = () => {
    changeDescription(descriptionValue);
    setOpenEditor(false);
  };

  const handleCancel = () => {
    setDescriptionValue(descriptionData);
    setOpenEditor(false);
  };

  useEffect(() => {
    if (descriptionData === "") {
      setDescriptionValue("<p>Enter description</p>");
      setOpenEditor(true);
    } else {
      setDescriptionValue(descriptionData);
      setOpenEditor(false);
    }
  }, [descriptionData]);

  return (
    <div className={styles.main}>
      <p>Description</p>
      {openEditor ? (
        <div className={styles["quill-container"]}>
          <ReactQuill
            className={styles.quill}
            theme="snow"
            value={descriptionValue}
            onChange={setDescriptionValue}
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
          dangerouslySetInnerHTML={{ __html: descriptionValue }}
        ></div>
      )}
    </div>
  );
};

export default Description;
