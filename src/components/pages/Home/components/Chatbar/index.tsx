import React from "react";
import { Text } from "../../../../global";
import {
  chat,
  user,
  loading as loader,
  plus,
} from "../../../../../assets/images";
import "./styles.css";
import { Chats } from "../../../../../apis";
import { GET } from "../../../../../utils/fetch";
import { getUser } from "../../../../../utils/handleUser";

interface ChatProps {
  name: string;
  latestMessage: string;
  image_url?: string;
  selected: boolean;
  onClick: () => void;
}
const Chat = ({
  name,
  latestMessage,
  image_url,
  selected,
  onClick,
}: ChatProps) => {
  return (
    <div
      className={`chat-main ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <div className="chat-container">
        <img src={user} alt="User" />
        <div>
          <Text varient="content2">{name}</Text>
          <Text varient="content3">{latestMessage}</Text>
        </div>
      </div>
    </div>
  );
};

interface ChatBarProps {
  setModal: (input: boolean) => void;
}
export const Chatbar = ({ setModal }: ChatBarProps) => {
  const [chats, setChats] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<number | null>(null);

  const user = getUser();

  const getChats = async () => {
    setLoading(true);
    const res = await GET(Chats);
    setChats(res);
    console.log("chats", res);
    setLoading(false);
  };
  React.useEffect(() => {
    getChats();
  }, []);

  return (
    <div className="chatbar-main">
      <Text varient="header3" className="heading" onClick={getChats}>
        <img src={chat} alt="chat" />
        <span>All Chats</span>
        <img
          src={loader}
          alt="reload"
          className={loading ? "chat-loader" : ""}
        />
      </Text>
      <div id="hr" />
      <div className="add-new" onClick={() => setModal(true)}>
        <img src={plus} alt="add" />
        <Text varient="content1">New Chat/Group</Text>
      </div>
      {chats?.map((item: any, index) => {
        const isGroupChat = item?.isGroupChat;
        const name = !isGroupChat
          ? item?.users?.find(
              (chatUser: any) => chatUser?.email === user?.email
            )?.name
          : item?.chatName;
        const latestMessage =
          item?.latestMessage?.content ?? "Send a first message?";

        return (
          <Chat
            key={index}
            name={name}
            latestMessage={latestMessage}
            selected={selected === index}
            onClick={() => setSelected(index)}
          />
        );
      })}
    </div>
  );
};
