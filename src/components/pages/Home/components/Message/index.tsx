import React from "react";
import { user } from "../../../../../assets/images";
import { Text } from "../../../../global";
import "./styles.css";

interface MessageProps {
  text: string;
  received?: boolean;
  image_url?: string;
  isImage?: boolean;
}
export const Message = ({
  text,
  received = false,
  isImage = false,
  image_url,
}: MessageProps) => {
  return (
    <div className={`message-main ${received ? "received" : "sent"}`}>
      <Text className="message">{text}</Text>
      <div className="image">
        {isImage ? <img src={image_url ?? user} alt="u" /> : null}
      </div>
    </div>
  );
};
