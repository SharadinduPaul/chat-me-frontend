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
  sentAt?: string;
}
export const Message = ({
  text = "",
  received = false,
  isImage = false,
  image_url,
  typing = false,
  sentAt = ""
}: MessageProps) => {
  const time = sentAt?.split("/");
  return (
    <div
      className={`message-main ${received ? "received" : "sent"}`}
      style={{ marginBottom: isImage ? "0.4rem" : "0.1rem" }}
    >
      {typing ? (
        <Lottie animationData={typingLottie} style={{ height: "2rem" }} />
      ) : (
        <>
          <div className="sent-at">
            <Text
              varient="content3"
              style={{
                lineHeight: "0.8rem",
                textAlign: received ? "left" : "right"
              }}
              faded
              italic
            >
              {time[1]}
              <br />
              {time[0]}
            </Text>
          </div>
          <Text className="message">{text}</Text>
        </>
      )}
      <div className="image">
        {isImage ? <img src={image_url ?? user} alt="u" /> : null}
      </div>
    </div>
  );
};
