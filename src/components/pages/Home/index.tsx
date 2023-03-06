import React from "react";
import { io } from "socket.io-client";
import { AllMessages, Chats, ReadByUsers, SendMessage } from "../../../apis";
import { UserContext } from "../../../utils/context";
import { GET, POST, PUT } from "../../../utils/fetch";
import { Modal } from "../../global";
import { Chatbar } from "./components/Chatbar";
import { CreateChat } from "./components/CreateChat";
import { MessagePanel } from "./components/MessagePanel";
import { Options } from "./components/Options";
import { Topbar } from "./components/Topbar";
import "./styles.css";

const ENDPOINT = process.env.REACT_APP_API_BASE!;
let socket: any, selectedChat: any;

export const Home = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<boolean>(false);
  const [chats, setChats] = React.useState<any[]>([]);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [active, setActive] = React.useState<boolean>(false);
  const [chatLoading, setChatLoading] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<any[]>([]);
  const [messageLoading, setMessageLoading] = React.useState<boolean>(false);
  const [typing, setTyping] = React.useState<boolean>(false);

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    document.title = "Messages - Chatme";

    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("connected to socket io");
    });
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    socket.on("read by", (data: any) => {
      const { room, users } = data;
      setChats((prev) => {
        const updatedChats = prev?.map((item) => {
          if (item?._id === room) return { ...item, readBy: users };
          else return item;
        });
        return updatedChats;
      });
    });

    socket.on("message received", (newMessage: any) => {
      console.log("new message", newMessage);
      if (selectedChat?._id !== newMessage?.chat?._id) {
        console.log("send notification");
      } else {
        //adding the new message to messages
        setMessages((prev) => {
          const lastMessage: any = prev.slice(-1);
          if (lastMessage?._id === newMessage?._id) return prev;
          else return [...prev, newMessage];
        });
        //emitting socket read
        socket.emit("read", {
          room: selectedChat?._id,
          users: [...selectedChat?.readBy, user],
        });

        setChats((prev) => {
          const updatedChats = prev?.map((item) => {
            if (item?._id === selectedChat?._id)
              return { ...item, readBy: [...selectedChat?.readBy, user] };
            else return item;
          });
          return updatedChats;
        });
      }
      setChats((prev) => {
        const updatedChats = prev?.map((item: any) => {
          if (item?._id === newMessage?.chat?._id) {
            return { ...item, latestMessage: newMessage };
          } else {
            return item;
          }
        });
        return updatedChats;
      });
    });
  }, []);

  const getChats = async () => {
    setChatLoading(true);
    const res = await GET(Chats, user?.token);
    if (res) {
      setChats(res);
    }
    console.log("chats", res);
    setChatLoading(false);
  };
  const getMessages = async (chat: any) => {
    setMessageLoading(true);
    if (selected === null) return;

    const res = await GET(AllMessages + chats[selected]?._id, user?.token);

    if (res) {
      //updateing messages
      setMessages(res);

      const userIds = (await chat?.readBy?.map((item: any) => item?._id)) ?? [];

      if (!userIds?.includes(user?._id)) {
        const readByRes = await PUT(
          ReadByUsers,
          {
            chatId: chat?._id,
            users: [...userIds, user?._id],
          },
          user?.token
        );

        if (readByRes) {
          //emitting socket read
          socket.emit("read", {
            room: chat?._id,
            users: [...chat?.readBy, user],
          });

          setChats((prev) => {
            const updatedChats = prev?.map((item) => {
              if (item?._id === chat?._id)
                return { ...item, readBy: [...chat?.readBy, user] };
              else return item;
            });
            return updatedChats;
          });
        }
      }
    }
    setMessageLoading(false);
    socket?.emit("join chat", selectedChat?._id);
  };
  const sendMessage = async (text: string, chatId: string) => {
    //validation
    if (!text || selected === null) return;

    const readByRes = await PUT(
      ReadByUsers,
      { chatId: chats[selected]?._id, users: [user?._id] },
      user?.token
    );
    if (readByRes) {
      //emitting socket read
      socket.emit("read", {
        room: chatId,
        users: [user],
      });
      setChats((prev) => {
        const updatedChats = prev?.map((item) => {
          if (item?._id === chatId) return { ...item, readBy: [user] };
          else return item;
        });
        return updatedChats;
      });
    }

    const res = await POST(
      SendMessage,
      {
        content: text,
        chatId: chatId,
      },
      user?.token
    );

    if (res) {
      //appending new message to allmessages
      setMessages((prev) => [...prev, res]);
      //emitting socket message
      socket.emit("new message", res);
      //setting the new message as latest message in chats
      setChats((prev) => {
        const updatedChats = prev?.map((item: any) => {
          if (item?._id === chats[selected ?? 0]?._id) {
            return { ...item, latestMessage: res };
          } else {
            return item;
          }
        });
        return updatedChats;
      });
    }
  };

  React.useEffect(() => {
    if (!modal) getChats();
  }, [modal]);
  React.useEffect(() => {
    if (selected !== null) {
      selectedChat = chats[selected];
      getMessages(chats[selected]);
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
  const chatId: string = selected !== null ? selectedChat?._id : "";
  return (
    <div className="home-main">
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <CreateChat close={() => setModal(false)} />
        </Modal>
      ) : null}
      {options ? (
        <Modal onClose={() => setOptions(false)}>
          <Options />
        </Modal>
      ) : null}
      <Chatbar
        setModal={setModal}
        loading={chatLoading}
        {...{ chats, getChats, selected, setSelected, active, setActive }}
      />
      <div className="home-content">
        <Topbar
          userName={selectedUserName}
          openOptions={() => setOptions(true)}
          {...{ setActive }}
        />
        <div className="message-container">
          <MessagePanel
            noChatSelected={selected === null}
            loading={messageLoading}
            faded={active}
            readBy={
              chats
                ? chats[selected ?? 0]?.readBy?.filter(
                    (item: any) => item?._id !== user?._id
                  )
                : []
            }
            closeChatbar={() => setActive(false)}
            {...{
              messages,
              sendMessage,
              user,
              socket,
              typing,
              chatId,
            }}
          />
        </div>
      </div>
    </div>
  );
};
