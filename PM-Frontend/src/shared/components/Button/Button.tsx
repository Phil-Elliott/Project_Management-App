import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary" | "danger";
  handleClick: () => void;
  space?: boolean;
  disabled?: boolean;
};

const Button = ({
  children,
  variant,
  handleClick,
  space,
  disabled,
}: ButtonProps) => {
  console.log("Button", disabled);

  return (
    <button
      className={`${styles[variant]}`}
      onClick={() => handleClick()}
      style={{ marginRight: space ? "1rem" : "0" }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

/*
   can have different syled buttons
   Primary
   Secondary


*/
