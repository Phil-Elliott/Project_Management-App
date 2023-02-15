import { useEffect, useState } from "react";
import styles from "./Priority.module.scss";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { Popup } from "~/shared/components";
import { TaskProps } from "~/shared/interfaces/Projects";
import { TaskDataProps } from "../../TaskModal";

type OptionProps = {
  name: string;
  color: string;
  icon: JSX.Element;
};

type PriorityProps = {
  priority: string;
  updateTaskData: <T extends keyof TaskDataProps>(
    type: T,
    value: TaskDataProps[T]
  ) => void;
};

const priorityOptions = [
  {
    name: "Urgent",
    color: "#F44336",
    icon: <AiOutlineArrowUp />,
  },
  {
    name: "High",
    color: "#FF5722",
    icon: <AiOutlineArrowUp />,
  },
  {
    name: "Normal",
    color: "#FFC107",
    icon: <AiOutlineArrowDown />,
  },
  { name: "Low", color: "#00B87C", icon: <AiOutlineArrowDown /> },
];

const Priority = ({ updateTaskData, priority }: PriorityProps) => {
  const [priorityData, setPriorityData] = useState<OptionProps>({
    name: "Normal",
    color: "#FFC107",
    icon: <AiOutlineArrowDown />,
  });
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const handlePriority = (option: OptionProps) => {
    setPriorityData(option);
    updateTaskData("priority", option.name);
    setShowOptions(false);
  };

  useEffect(() => {
    const PriorityObject = priorityOptions.find(
      (option) => option.name === priority
    );
    if (PriorityObject) {
      setPriorityData(PriorityObject);
    }
  }, [priority]);

  return (
    <div className={styles["main"]}>
      <h5>Priority</h5>
      <div className={styles.content}>
        <div
          className={styles.choice}
          onClick={() => setShowOptions(!showOptions)}
        >
          <div
            className={styles["option-icon"]}
            style={{ color: priorityData.color }}
          >
            {priorityData.icon}
          </div>
          <p>{priorityData.name}</p>
        </div>

        {showOptions && (
          <Popup close={setShowOptions}>
            {priorityOptions.map((option) => {
              return (
                <div
                  className={styles["option"]}
                  onClick={() => handlePriority(option)}
                >
                  <div
                    className={styles["option-icon"]}
                    style={{ color: option.color }}
                  >
                    {option.icon}
                  </div>
                  <p>{option.name}</p>
                </div>
              );
            })}
          </Popup>
        )}
      </div>
    </div>
  );
};

export default Priority;

/*

- 


*/
