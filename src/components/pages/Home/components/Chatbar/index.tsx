import React from "react";
import { Text } from "../../../../global";
import {
  user as userPNG,
  loading as loader,
  close,
} from "../../../../../assets/images";
import { UserContext } from "../../../../../utils/context";
import Lottie from "lottie-react";
import loadingLottie from "../../../../../assets/animated/loading.json";
import addUser from "../../../../../assets/animated/addUser.json";
import addChat from "../../../../../assets/animated/addChat.json";
import { useNavigate } from "react-router-dom";
import { Chat } from "../Chat";
import "./styles.css";

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

  const navigate = useNavigate();

  return (
    <div className={`chatbar-main ${active ? "active" : ""}`}>
      <Text className="heading" onClick={() => navigate("/profile")}>
        <img
          src={user?.pic}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src = String(userPNG);
          }}
        />
        <Text>{user?.name}</Text>
        <img
          src={close}
          alt="Close"
          className="close"
          onClick={(e) => {
            e.stopPropagation();
            setActive(false);
          }}
        />
        <div id="hr" />
      </Text>
      <div className="add-new" onClick={() => setModal(true)}>
        <Lottie loop animationData={addUser} style={{ height: "3rem" }} />
        <Text varient="content1">New Chat</Text>
      </div>
      <div className="all-chats" onClick={getChats}>
        <Text varient="content2" italic style={{ padding: "0.4rem" }}>
          All chats
        </Text>
        {loading ? (
          <Lottie animationData={loadingLottie} style={{ height: "2.4rem" }} />
        ) : null}
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
          const updatedAt = item?.latestMessage?.updatedAt;
          const readByIds = item?.readBy?.map((item: any) => item?._id);
          return (
            <Chat
              key={index}
              name={name}
              online={false}
              image_url={""}
              read={readByIds?.includes(user?._id)}
              latestMessage={latestMessage}
              selected={selected === index}
              updatedAt={updatedAt}
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
