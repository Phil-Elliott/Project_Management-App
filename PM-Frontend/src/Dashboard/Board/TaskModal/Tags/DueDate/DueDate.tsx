import React, { useEffect, useState } from "react";
import { TaskProps } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../../TaskModal";
import styles from "./DueDate.module.scss";

type DueDateProps = {
  due: string;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

const DueDate = ({ due, updateTaskData }: DueDateProps) => {
  const [date, setDate] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  useEffect(() => {
    if (date) {
      updateTaskData("due", date);
    }
  }, [date]);

  return (
    <div className={styles.main}>
      <h5>Due Date</h5>
      <div className={styles.content}>
        <input
          type="date"
          value={due ? due : ""}
          onChange={(e) => handleChange(e)}
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
