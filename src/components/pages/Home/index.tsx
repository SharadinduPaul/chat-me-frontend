import React from "react";
import { AllMessages, Chats } from "../../../apis";
import { UserContext } from "../../../utils/context";
import { GET } from "../../../utils/fetch";
import { Modal } from "../../global";
import { Chatbar } from "./components/Chatbar";
import { CreateChat } from "./components/CreateChat";
import { MessagePanel } from "./components/MessagePanel";
import { Topbar } from "./components/Topbar";
import "./styles.css";

export const Home = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [chats, setChats] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [active, setActive] = React.useState<boolean>(false);
  const [chatLoading, setChatLoading] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<any[]>([]);
  const [messageLoading, setMessageLoading] = React.useState<boolean>(false);

  const { user } = React.useContext(UserContext);

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
  };
  const sendMessage = async (text: string) => {
    console.log(text);
    return;
  };
  React.useEffect(() => {
    getChats();
  }, [modal]);
  React.useEffect(() => {
    if (selected !== null) {
      getMessages();
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
            {...{ messages, sendMessage }}
          />
        </div>
      </div>
    </div>
  );
};
