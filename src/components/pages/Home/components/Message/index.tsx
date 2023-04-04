import React from "react";
import Lottie from "lottie-react";
import { user as userPNG } from "../../../../../assets/icons";
import { Text, UserImage } from "../../../../global";
import "./styles.css";
import typingLottie from "../../../../../assets/animated/typing.json";

interface MessageProps {
  text?: string;
  received?: boolean;
  image_url?: string;
  isImage?: boolean;
  sentAt?: string;
  topRounded?: boolean;
  senderName?: string;
  isGroupChat?: boolean;
}
export const Message = ({
  text = "",
  received = false,
  topRounded,
  isImage = false,
  image_url,
  sentAt = "",
  senderName = "",
  isGroupChat
}: MessageProps) => {
  const time = sentAt?.split("/");
  return (
    <>
      <div
        className={`message-main ${received ? "received" : "sent"}`}
        style={{ marginBottom: isImage ? "0.4rem" : "0.1rem" }}
      >
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
        <Text
          className={`message ${isImage ? "tail" : ""} ${
            topRounded ? "topRounded" : ""
          }`}
        >
          <pre style={{ whiteSpace: "pre-wrap" }}>{text}</pre>
        </Text>
        <div className="image">
          {isImage ? <UserImage imageUrl={image_url} /> : null}
        </div>
      </div>
      {isImage && senderName && received && isGroupChat ? (
        <div className="message-sender">
          <Text varient="content2" faded>
            {senderName}
          </Text>
        </div>
      ) : null}
    </>
  );
};
