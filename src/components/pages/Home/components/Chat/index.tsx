import React from "react";
import Lottie from "lottie-react";
import { user } from "../../../../../assets/images";
import { Text } from "../../../../global";
import onlineLottie from "../../../../../assets/animated/online.json";
import "./styles.css";
import moment from "moment";

interface ChatProps {
  name: string;
  latestMessage: string;
  image_url?: string;
  selected: boolean;
  read: boolean;
  updatedAt: string;
  online: boolean;
  onClick: () => void;
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
}: ChatProps) => {
  const [lastUpdate, setLastUpdate] = React.useState<string>("");
  React.useEffect(() => {
    // if()
    const updatedAtYear = Number(moment(updatedAt).format("YYYY"));
    const updatedAtMonth = Number(moment(updatedAt).format("MM"));
    const updatedAtDay = Number(moment(updatedAt).format("DD"));
    const updatedAtTime = moment(updatedAt).format("LT");
    console.log(updatedAtTime, updatedAtDay, updatedAtMonth, updatedAtYear);
    if (moment().year() - updatedAtYear > 0) {
      setLastUpdate(String(updatedAtYear));
    } else if (moment().date() - updatedAtDay > 0) {
      setLastUpdate(moment(updatedAt).format("Do MMM"));
    } else {
      setLastUpdate(String(updatedAtTime));
    }
  }, [updatedAt]);

  return (
    <div
      className={`chat-main ${selected ? "selected" : ""} ${
        !read ? "unread" : ""
      }`}
      onClick={onClick}
    >
      <img
        className="user-image"
        src={image_url}
        alt=""
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src = String(user);
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
        {online ? (
          <Lottie animationData={onlineLottie} style={{ height: "1.5rem" }} />
        ) : null}
      </div>
    </div>
  );
};
