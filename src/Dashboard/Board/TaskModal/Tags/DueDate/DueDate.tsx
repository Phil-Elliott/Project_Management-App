import React, { useEffect, useState } from "react";
import { TaskProps } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../../TaskModal";
import styles from "./DueDate.module.scss";

type DueDateProps = {
  taskData: any;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

const DueDate = ({ taskData, updateTaskData }: DueDateProps) => {
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    setDate(taskData.due);
  }, [taskData]);

  const handleDateChange = (e: any) => {
    setDate(e);
    updateTaskData("due", e);
  };

  return (
    <div className={styles.main}>
      <h5>Due Date</h5>
      <div className={styles.content}>
        <input
          type="date"
          value={date ? date : ""}
          onChange={(e) => handleDateChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default DueDate;

/*

 1) Have a ref to the input element
 2) When the user clicks on the input element, open the date picker
 3) When the user selects a date, close the date picker and update the input element
 4) Change the initial state to include that date 

*/
