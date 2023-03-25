import React from "react";
import Lottie from "lottie-react";
import { Text, UserImage } from "../../../../global";
import { shortHandTime } from "../../../../../utils/formatTime";
import "./styles.css";

interface ChatProps {
  name: string;
  latestMessage: string;
  image_url?: string;
  selected: boolean;
  read: boolean;
  updatedAt: string;
  online: boolean;
  onClick: () => void;
  openInfo: () => void;
}
export const Chat = ({
  name,
  latestMessage,
  image_url = "",
  selected,
  read,
  updatedAt,
  online,
  onClick,
  openInfo
}: ChatProps) => {
  const [lastUpdate, setLastUpdate] = React.useState<string>("");

  React.useEffect(() => {
    const shortHandUpdatedAt = shortHandTime(updatedAt);
    setLastUpdate(shortHandUpdatedAt);
  }, [updatedAt]);

  return (
    <div
      className={`chat-main ${selected ? "selected" : ""} ${
        !read ? "unread" : ""
      }`}
      onClick={onClick}
    >
      {online ? <div className="online" /> : null}
      <UserImage
        imageUrl={image_url}
        rounded
        onClick={(e) => {
          e.stopPropagation();
          openInfo();
        }}
      />
      <div className="chat-content">
        <Text varient="content2">{name}</Text>
        <Text varient="content3" faded={read}>
          {latestMessage}
        </Text>
      </div>
      <div className="updated-at">
        <Text varient="content3" italic>
          {lastUpdate}
        </Text>
      </div>
    </div>
  );
};
