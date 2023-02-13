import React from "react";
import "./styles.css";

interface TextProps {
  varient?:
    | "header1"
    | "header2"
    | "header3"
    | "content1"
    | "content2"
    | "content3";
  underline?: boolean;
  italic?: boolean;
  faded?: boolean;
  children?: any;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
}
export const Text = ({
  varient = "content1",
  underline,
  italic,
  faded,
  children,
  style,
  className,
  onClick,
}: TextProps) => {
  return (
    <div
      className={`${varient} ${className}`}
      style={{
        ...style,
        textDecoration: underline ? "underline" : "none",
        opacity: faded ? 0.5 : 1,
        fontStyle: italic ? "italic" : "normal",
      }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
