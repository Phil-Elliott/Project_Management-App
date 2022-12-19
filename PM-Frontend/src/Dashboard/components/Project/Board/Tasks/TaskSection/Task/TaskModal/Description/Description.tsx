import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from "../../../../../../../../../shared/components/Button/Button";
import styles from "./Description.module.scss";

const Description = () => {
  const [descriptionValue, setDescriptionValue] = useState("");

  const handleClick = () => {
    console.log("clicked");
  };

  return (
    <div className={styles.main}>
      <p>Description</p>
      <div className={styles["quill-container"]}>
        <ReactQuill
          className={styles.quill}
          theme="snow"
          value={descriptionValue}
          onChange={setDescriptionValue}
        />
        <div className={styles.buttons}>
          <Button variant={"primary"} handleClick={handleClick}>
            Save
          </Button>
          <Button variant={"secondary"} handleClick={handleClick}>
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Description;
