import React from "react";
import { Text } from "../../global";
import "./styles.css";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  color?: "accent1" | "accent2";
  disabled?: boolean;
  children?: any;
  onClick?: (e?: any) => void;
  style?: React.CSSProperties;
  className?: string;
}
export const Button = ({
  type,
  onClick = () => {},
  disabled = false,
  style,
  color = "accent1",
  className,
  children
}: ButtonProps) => {
  return (
    <button
      className={`button-main ${color} ${className}`}
      type={type}
      disabled={disabled}
      style={{ ...style }}
      onClick={(e) => onClick(e)}
    >
      <Text varient="content1">{children}</Text>
    </button>
  );
};
