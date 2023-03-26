import React from "react";
import { show as showPNG, hide } from "../../../assets/icons";
import { Text } from "../Text";
import "./styles.css";

interface InputProps {
  autoFocus?: boolean;
  className?: string;
  color?: "accent1" | "accent2";
  completed?: boolean;
  disabled?: boolean;
  errorMessage?: string;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeHolder: string;
  showError?: boolean;
  style?: React.CSSProperties;
  type?: React.HTMLInputTypeAttribute;
  value?: string;
  faded?: boolean;
  maxLength?: number;
}
export const Input = ({
  color = "accent1",
  completed = false,
  className,
  disabled = false,
  errorMessage,
  placeHolder = "text",
  showError,
  style,
  type = "text",
  value = "",
  faded = false,
  ...rest
}: InputProps) => {
  const [focus, setFocus] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<boolean>(false);

  const inputRef = React.useRef<HTMLInputElement>(null);
  React.useEffect(() => {
    if (inputRef.current && type === "password") {
      if (show) {
        inputRef.current.type = "text";
      } else {
        inputRef.current.type = "password";
      }
      inputRef.current.focus();
    }
  }, [show]);
  return (
    <div
      className={`input-main ${color} ${faded ? "faded" : ""} ${
        focus ? "focused" : ""
      } ${completed ? "completed" : ""} ${className}`}
    >
      <div className="input-container">
        <div className="input-background" />
        <input
          className={disabled ? "disabled" : ""}
          {...rest}
          ref={inputRef}
          type={type}
          value={value}
          disabled={disabled}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <Text className={`placeholder ${value?.length > 0 ? "active" : ""}`}>
          {placeHolder}
        </Text>
        {type !== "password" ? null : show ? (
          <img
            className="show-hide"
            src={showPNG}
            alt="show"
            onClick={() => setShow(false)}
          />
        ) : (
          <img
            className="show-hide"
            src={hide}
            alt="hide"
            onClick={() => setShow(true)}
          />
        )}
      </div>
      {showError ? (
        <Text varient="content3" className="error-message">
          {errorMessage}
        </Text>
      ) : null}
    </div>
  );
};
