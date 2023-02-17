import React from "react";
import { io } from "socket.io-client";
import { AllMessages, Chats, SendMessage } from "../../../apis";
import { UserContext } from "../../../utils/context";
import { GET, POST } from "../../../utils/fetch";
import { Modal } from "../../global";
import { Chatbar } from "./components/Chatbar";
import { CreateChat } from "./components/CreateChat";
import { MessagePanel } from "./components/MessagePanel";
import { Topbar } from "./components/Topbar";
import "./styles.css";

const ENDPOINT = "http://localhost:5000";
let socket: any, selectedChatCompare: any;

export const Home = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [chats, setChats] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [active, setActive] = React.useState<boolean>(false);
  const [chatLoading, setChatLoading] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<any[]>([]);
  const [messageLoading, setMessageLoading] = React.useState<boolean>(false);
  const [typing, setTyping] = React.useState<boolean>(false);

  const [notifications, setNotifications] = React.useState<any[]>([]);

  const { user } = React.useContext(UserContext);

  var selectedChat = selected !== null ? chats[selected] : "sss";

  React.useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("connected to socket io");
    });
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));
  }, []);
  React.useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      console.log("new message", newMessage);
      console.log("selected Chat", selectedChat, selected);
      if (
        selected === null ||
        selectedChatCompare?._id !== newMessage?.chat?._id
      ) {
        console.log("send notification");
        setNotifications((prev) => [...prev, newMessage]);
        setChats((prev) => {
          const updatedChats = prev?.map((item: any) => {
            if (item?._id === newMessage?.chat?._id) {
              console.log("updateing this chat");
              return { ...item, latestMessage: newMessage };
            } else {
              console.log("just returning");
              return item;
            }
          });
          return updatedChats;
        });
      } else {
        console.log("send message");
        setMessages((prev) => [...prev, newMessage]);
      }
    });
  }, [selected, chats]);

  const getChats = async () => {
    setChatLoading(true);
    const res = await GET(Chats, user?.token);
    setChats(res);
    console.log("chats", res);
    setChatLoading(false);
  };
  const getMessages = async () => {
    setMessageLoading(true);
    if (selected === null) return;

    const res = await GET(AllMessages + chats[selected]?._id, user?.token);
    if (res) {
      setMessages(res);
    }
    setMessageLoading(false);
    socket?.emit("join chat", chats[selected]?._id);
  };
  const sendMessage = async (text: string) => {
    if (!text || selected === null) return;
    const res = await POST(
      SendMessage,
      {
        content: text,
        chatId: chats[selected]?._id,
      },
      user?.token
    );

    if (res) {
      setTyping(false);
      socket.emit("new message", res);
      setMessages((prev) => [...prev, res]);
    }
  };

  React.useEffect(() => {
    getChats();
  }, [modal]);
  React.useEffect(() => {
    if (selected !== null) {
      getMessages();
      selectedChatCompare = chats[selected];
    }
  }, [selected]);
  const selectedUserName =
    selected !== null
      ? chats[selected]?.isGroupChat
        ? chats[selected]?.chatName
        : chats[selected]?.users?.find(
            (item: any) => item?.email !== user?.email
          )?.name
      : "Messages";
  const chatId: string = selected !== null ? chats[selected]._id : "";
  return (
    <div className="home-main">
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <CreateChat close={() => setModal(false)} />
        </Modal>
      ) : null}
      <Chatbar
        setModal={setModal}
        loading={chatLoading}
        {...{ chats, getChats, selected, setSelected, active, setActive }}
      />
      <div className="home-content">
        <Topbar userName={selectedUserName} {...{ setActive, notifications }} />
        <div className="message-container">
          <MessagePanel
            noChatSelected={selected === null}
            loading={messageLoading}
            faded={active}
            {...{ messages, sendMessage, user, socket, typing, chatId }}
          />
        </div>
      </div>
    </div>
  );
};
