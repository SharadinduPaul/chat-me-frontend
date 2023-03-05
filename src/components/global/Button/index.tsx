import React from "react";
import { Text } from "../../global";
import "./styles.css";

interface ButtonProps {
  type?: "button" | "reset" | "submit" | undefined;
  color?: "accent1" | "accent2";
  children?: any;
  onClick?: () => void;
  style?: React.CSSProperties;
  className?: string;
}
export const Button = ({
  type,
  onClick,
  style,
  color = "accent1",
  className,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`button-main ${color} ${className}`}
      type={type}
      style={{ ...style }}
      onClick={onClick}
    >
      <Text varient="content1">{children}</Text>
    </button>
  );
};
