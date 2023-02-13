import React from "react";
import "./styles.css";

interface ModalProps {
  style?: React.CSSProperties;
  children?: any;
  className?: string;
  onClose: () => void;
}
export const Modal = ({ onClose, style, className, children }: ModalProps) => {
  return (
    <div className={`modal-main`} onClick={onClose}>
      <div
        className={`modal-content ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
