import React from "react";
import { Text } from "../Text";
import "./styles.css";

interface InputProps {
  name?: string;
  type?: React.HTMLInputTypeAttribute;
  placeHolder: string;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  showError?: boolean;
  errorMessage?: string;
  autoFocus?: boolean;
  color?: "accent1" | "accent2";
  style?: React.CSSProperties;
  className?: string;
}
export const Input = ({
  placeHolder = "text",
  showError,
  errorMessage,
  color = "accent1",
  value = "",
  style,
  className,
  ...rest
}: InputProps) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  return (
    <div
      className={`input-main ${color} ${focus ? "focused" : ""} ${className}`}
    >
      <div className="input-container">
        <div className="input-background" />
        <input
          {...rest}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <Text
          className={`placeholder ${value?.length > 0 ? "active" : ""}`}
          //   varient="content2"
        >
          {placeHolder}
        </Text>
      </div>
      {showError ? (
        <Text varient="content3" className="error-message">
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
};
