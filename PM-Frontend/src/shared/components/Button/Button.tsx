import React from "react";
import styles from "./Button.module.scss";

type ButtonProps = {
  children: React.ReactNode;
  variant: "primary" | "secondary";
  handleClick: () => void;
};

const Button = ({ children, variant, handleClick }: ButtonProps) => {
  return (
    <button className={`${styles[variant]}`} onClick={() => handleClick()}>
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
