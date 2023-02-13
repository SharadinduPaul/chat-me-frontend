import React from "react";
import "./styles.css";

interface SwitchProps {
  selected: boolean;
  onClick: () => void;
  varient?: "accent1" | "accent2";
}
export const Switch = ({
  selected,
  onClick,
  varient = "accent1",
}: SwitchProps) => {
  return (
    <div
      className={`switch-main ${selected ? "selected" : ""} ${varient}`}
      onClick={onClick}
    >
      <div />
    </div>
  );
};
