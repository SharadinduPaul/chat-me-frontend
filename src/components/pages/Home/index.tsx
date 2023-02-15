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

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connection", () => {
      console.log("connected to socket io");
    });
  }, []);
  React.useEffect(() => {
    socket.on("message received", (newMessage: any) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare?._id !== newMessage?.chat?._id
      ) {
        //give notification
      } else {
        setMessages([...messages, newMessage]);
      }
    });
  });

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
    console.log(res);
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
      console.log(res);
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
        <Topbar {...{ setActive }} />
        <div className="message-container">
          <MessagePanel
            noChatSelected={selected === null}
            loading={messageLoading}
            {...{ messages, sendMessage, user }}
          />
        </div>
      </div>
    </div>
  );
};
