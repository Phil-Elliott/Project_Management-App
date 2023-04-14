import React from "react";
import styles from "./Instructions.module.scss";

import signIn from "../../assets/landing/signInScreen.png";
import project from "../../assets/landing/createProjectScreen.png";
import list from "../../assets/landing/createListScreen.png";
import task from "../../assets/landing/createTasksScreen.png";
import edit from "../../assets/landing/editTaskScreen.png";

const data = [
  {
    title: "Sign In",
    description:
      "Sign in to your account or create a new one Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod..",
    image: signIn,
  },
  {
    title: "Create a Project",
    description:
      "Create a project to organize your tasks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: project,
  },
  {
    title: "Create a List",
    description:
      "Create a list to organize your tasks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: list,
  },
  {
    title: "Create a Task",
    description:
      "Create a task to organize your tasks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: task,
  },
  {
    title: "Edit a Task",
    description:
      "Edit a task to organize your tasks. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.",
    image: edit,
  },
];

const Instructions = () => {
  return (
    <div className={styles.main}>
      <h1>How it works</h1>
      <p className={styles["top-description"]}>
        Planning a project and creating tasks has never been easier.
      </p>
      <div className={styles["instructions-container"]}>
        {data.map((item, index) => (
          <div className={styles["instruction-item"]} key={index}>
            <div className={styles.info}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </div>
            <div className={styles.image}>
              <img src={item.image} alt={item.title} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Instructions;

/*

1) Get an image to use
2) Make a variable with the data
3) Map over the data and return the JSX


*/
