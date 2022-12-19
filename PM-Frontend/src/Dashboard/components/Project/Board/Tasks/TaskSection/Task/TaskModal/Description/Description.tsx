import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Description = () => {
  const [descriptionValue, setDescriptionValue] = useState("");

  return (
    <div className="task-modal-description">
      <p>Description</p>
      <ReactQuill
        theme="snow"
        value={descriptionValue}
        onChange={setDescriptionValue}
      />
    </div>
  );
};

export default Description;
