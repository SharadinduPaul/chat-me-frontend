import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../../../utils/context";
import { Chat } from "../index";
import { SearchBar, Text, UserImage } from "../../../../global";
import { close, group } from "../../../../../assets/icons";
import loadingLottie from "../../../../../assets/animated/loading.json";
import addUser from "../../../../../assets/animated/addUser.json";
import addChat from "../../../../../assets/animated/addChat.json";
import { ChatModel } from "../../../../../apis/models";
import "./styles.css";

interface ChatBarProps {
  setModal: (input: boolean) => void;
  openInfo: (index: number) => void;
  chats: ChatModel[];
  selected: number | null;
  setSelected: (input: number) => void;
  getChats: () => void;
  loading: boolean;
  active: boolean;
  setActive: (input: boolean) => void;
  unreadMessages: number;
}
export const Chatbar = ({
  setModal,
  openInfo,
  chats,
  selected,
  setSelected,
  getChats,
  loading,
  active,
  setActive,
  unreadMessages
}: ChatBarProps) => {
  const { user } = React.useContext(UserContext);

  const [filteredchats, setfilteredchats] = React.useState<ChatModel[]>([]);

  const renderdChats = filteredchats.length > 0 ? filteredchats : chats;

  const searchBarRef = React.useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleSearch = (text: string) => {
    setfilteredchats(
      chats.filter((chat) => {
        const name = chat.isGroupChat
          ? chat.chatName
          : chat?.users?.find(
              (chatUser: any) => chatUser?.email !== user?.email
            )?.name ?? "";
        console.log(name);

        return name.toLowerCase().includes(text.toLowerCase());
      })
    );
    console.log("filterChats: ", filteredchats);
  };

  const handleChatClick = (index: number) => {};

  return (
    <div className={`chatbar-main ${active ? "active" : ""}`}>
      <Text className="heading" onClick={() => navigate("/profile")}>
        <UserImage imageUrl={user?.pic} />
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
      {/* <div className="search">
        <SearchBar
          ref={searchBarRef}
          placeholder="Search chat"
          onChange={(text) => handleSearch(text)}
          time={400}
        />
      </div> */}
      <div className="all-chats" onClick={getChats}>
        <Text varient="content2" italic style={{ padding: "0.4rem" }}>
          All chats{" "}
          {unreadMessages > 0 ? (
            <span className="unreadMessages">({unreadMessages})</span>
          ) : null}
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
        renderdChats?.map((item: ChatModel, index) => {
          const isGroupChat = item?.isGroupChat;
          const name = !isGroupChat
            ? item?.users?.find(
                (chatUser: any) => chatUser?.email !== user?.email
              )?.name
            : item?.chatName;
          const pic = !isGroupChat
            ? item?.users?.find(
                (chatUser: any) => chatUser?.email !== user?.email
              )?.pic
            : String(group);
          const latestMessage =
            item?.latestMessage?.content ?? "Send a message?";
          const updatedAt = item?.latestMessage
            ? item?.latestMessage?.updatedAt
            : item?.updatedAt;
          const readByIds = item?.readBy?.map((item: any) => item?._id);
          return (
            <Chat
              key={index}
              name={name ?? ""}
              online={false} //this feature is yet to be done
              openInfo={() => {
                console.log("clicked on ", index);
                openInfo(index);
              }}
              image_url={pic}
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
