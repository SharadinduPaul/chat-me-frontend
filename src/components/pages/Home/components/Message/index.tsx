import React from "react";
import Lottie from "lottie-react";
import { user } from "../../../../../assets/images";
import { Text } from "../../../../global";
import "./styles.css";
import typingLottie from "../../../../../assets/animated/typing.json";

interface MessageProps {
  text?: string;
  received?: boolean;
  image_url?: string;
  isImage?: boolean;
  typing?: boolean;
}
export const Message = ({
  text = "",
  received = false,
  isImage = false,
  image_url,
  typing = false,
}: MessageProps) => {
  return (
    <div className={`message-main ${received ? "received" : "sent"}`}>
      {typing ? (
        <Lottie animationData={typingLottie} style={{ height: "2rem" }} />
      ) : (
        <Text className="message">{text}</Text>
      )}
      <div className="image">
        {isImage ? <img src={image_url ?? user} alt="u" /> : null}
      </div>
    </div>
  );
};
