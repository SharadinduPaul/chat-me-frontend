import React from "react";
import { user } from "../../../assets/images";
import "./styles.css";

interface UserImageProps {
  imageUrl?: string;
  alt?: string;
  style?: React.CSSProperties;
  className?: string;
  rounded?: boolean;
}

export const UserImage = ({
  imageUrl,
  alt,
  rounded = false,
  style,
  className
}: UserImageProps) => {
  return (
    <img
      src={imageUrl ? imageUrl : "link-unavailable"}
      alt={alt || "User"}
      className={`user-image ${rounded ? "rounded" : ""} ${className}`}
      style={style}
      onError={({ currentTarget }) => {
        currentTarget.onerror = null;
        currentTarget.src = String(user);
      }}
    />
  );
};
