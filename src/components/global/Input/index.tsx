import React from "react";
import { show as showPNG, hide } from "../../../assets/images";
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
  disabled?: boolean;
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
  type = "text",
  disabled = false,
  style,
  className,
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
      className={`input-main ${color} ${focus ? "focused" : ""} ${className}`}
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
