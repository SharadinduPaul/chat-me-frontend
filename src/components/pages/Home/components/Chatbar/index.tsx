import React from "react";
import { Text } from "../../../../global";
import {
  chat,
  user,
  loading as loader,
  close,
} from "../../../../../assets/images";
import { UserContext } from "../../../../../utils/context";
import Lottie from "lottie-react";
import chatlottie from "../../../../../assets/animated/chat.json";
import addUser from "../../../../../assets/animated/addUser.json";
import addChat from "../../../../../assets/animated/addChat.json";
import "./styles.css";

interface ChatProps {
  name: string;
  latestMessage: string;
  image_url?: string;
  selected: boolean;
  read: boolean;
  onClick: () => void;
}
const Chat = ({
  name,
  latestMessage,
  image_url,
  selected,
  read,
  onClick,
}: ChatProps) => {
  return (
    <div
      className={`chat-main ${selected ? "selected" : ""} ${
        !read ? "unread" : ""
      }`}
      onClick={onClick}
    >
      <div className="chat-container">
        <img src={user} alt="User" />
        <div>
          <Text varient="content2">{name}</Text>
          <Text varient="content3" faded={read}>
            {latestMessage}
          </Text>
        </div>
      </div>
    </div>
  );
};

interface ChatBarProps {
  setModal: (input: boolean) => void;
  chats: any[];
  selected: number | null;
  setSelected: (input: number) => void;
  getChats: () => void;
  loading: boolean;
  active: boolean;
  setActive: (input: boolean) => void;
}
export const Chatbar = ({
  setModal,
  chats,
  selected,
  setSelected,
  getChats,
  loading,
  active,
  setActive,
}: ChatBarProps) => {
  const { user } = React.useContext(UserContext);

  return (
    <div className={`chatbar-main ${active ? "active" : ""}`}>
      <Text varient="header3" className="heading" onClick={getChats}>
        <Lottie
          loop
          animationData={chatlottie}
          style={{ height: "3rem", marginLeft: ".5rem" }}
        />
        <Text varient="header3">All Chats</Text>
        {loading ? (
          <img src={loader} alt="reload" />
        ) : (
          <img
            src={close}
            className="close"
            alt="close"
            onClick={(e) => {
              e.stopPropagation();
              setActive(false);
            }}
          />
        )}
        <div id="hr" />
      </Text>
      <div className="add-new" onClick={() => setModal(true)}>
        <Lottie loop animationData={addUser} style={{ height: "3rem" }} />
        <Text varient="content1">New Chat</Text>
      </div>
      {chats?.length === 0 ? (
        <div>
          <Lottie
            animationData={addChat}
            style={{ height: "200px", marginTop: "20vh" }}
          />
          <Text
            varient="header3"
            style={{ textAlign: "center", marginTop: "2rem" }}
          >
            No chat found
          </Text>
          <Text faded style={{ textAlign: "center" }}>
            Start a new one.
          </Text>
        </div>
      ) : (
        chats?.map((item: any, index) => {
          const isGroupChat = item?.isGroupChat;
          const name = !isGroupChat
            ? item?.users?.find(
                (chatUser: any) => chatUser?.email !== user?.email
              )?.name
            : item?.chatName;
          const latestMessage =
            item?.latestMessage?.content ?? "Send a first message?";
          const readByIds = item?.readBy?.map((item: any) => item?._id);
          return (
            <Chat
              key={index}
              name={name}
              read={readByIds?.includes(user?._id)}
              latestMessage={latestMessage}
              selected={selected === index}
              onClick={() => {
                setSelected(index);
                setActive(false);
              }}
            />
          );
        })
      )}
    </div>
  );
};
