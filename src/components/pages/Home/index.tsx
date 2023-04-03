import React from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { io } from "socket.io-client";

import { AllMessages, Chats, ReadByUsers, SendMessage } from "../../../apis";
import { ChatModel, MessageModel } from "../../../apis/models";
import {
  faviconNormal,
  faviconNotification,
  noInternet
} from "../../../assets/icons";
import { changeFavicon } from "../../../utils/changeFavicon";
import { UserContext } from "../../../utils/context";
import { GET, POST, PUT } from "../../../utils/fetch";
import { Modal, Text } from "../../global";
import {
  Chatbar,
  ChatInfo,
  CreateChat,
  MessagePanel,
  Offline,
  Options,
  Topbar
} from "./components";
import "./styles.css";

const ENDPOINT = process.env.REACT_APP_API_BASE!;
let socket: any, selectedChat: any;

export const Home = () => {
  const [online, setOnline] = React.useState<boolean>(true);
  // const [focus, setFocus] = React.useState<boolean>(true);

  const [createChat, setCreateChat] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<"options" | "info" | null>(null);
  const [infoChat, setInfoChat] = React.useState<any>(null);

  const [chats, setChats] = React.useState<ChatModel[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(null);
  const [active, setActive] = React.useState<boolean>(false);
  const [chatLoading, setChatLoading] = React.useState<boolean>(false);

  const [messages, setMessages] = React.useState<MessageModel[]>([]);
  const [messageLoading, setMessageLoading] = React.useState<boolean>(false);
  const [typing, setTyping] = React.useState<boolean>(false);

  const [unreadMessages, setUnreadMessages] = React.useState<number>(0);

  const { user } = React.useContext(UserContext);

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  const audio = new Audio(
    String(require("../../../assets/audio/notification.mp3"))
  );

  React.useEffect(() => {
    document.title = "Messages | Chatme";
    getChats();
    // let focus = true; //this is a future change

    //to check for focus //this is a future change
    // window.addEventListener("focus", () => (focus = true));
    // window.addEventListener("blur", () => (focus = false));

    //to check online offline status of website
    window.addEventListener("online", () => setOnline(true));
    window.addEventListener("offline", () => setOnline(false));

    //socket setup
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => {
      console.log("connected to socket io");
    });

    //typing indicator sockets
    socket.on("typing", () => setTyping(true));
    socket.on("stop typing", () => setTyping(false));

    //chat read socket
    socket.on("read by", (data: any) => {
      const { room, users } = data;
      console.log("read by socket received");
      setChats((prev) => {
        const updatedChats = prev?.map((item) => {
          if (item?._id === room) return { ...item, readBy: users };
          else return item;
        });
        return updatedChats;
      });
    });

    //message receiving socket
    socket.on("message received", (newMessage: any) => {
      if (selectedChat?._id !== newMessage?.chat?._id) {
        console.log("send notification", newMessage);
        audio.play();
        let chatFound = false;
        setChats((prev) => {
          const updatedChats = prev?.map((item) => {
            if (item?._id === newMessage?.chat?._id) {
              chatFound = true;
              return { ...item, readBy: [newMessage?.sender] };
            } else return item;
          });
          return updatedChats;
        });

        //this will trigger when new message is sent from a new chat.
        if (!chatFound) getChats();
      } else {
        console.log("new message", newMessage);
        //adding the new message to messages
        setMessages((prev) => {
          const lastMessage: any = prev.slice(-1);
          if (lastMessage?._id === newMessage?._id) return prev;
          else return [...prev, newMessage];
        });
        //emitting socket read
        // if (focus) {
        socket.emit("read", {
          room: selectedChat?._id,
          users: [...selectedChat?.readBy, user]
        });
        sendReadBy(selectedChat?._id, [...selectedChat?.readBy, user]);

        setChats((prev) => {
          const updatedChats = prev?.map((item) => {
            if (item?._id === selectedChat?._id)
              return { ...item, readBy: [...selectedChat?.readBy, user] };
            else return item;
          });
          return updatedChats;
        });
        // }
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

  React.useEffect(() => {
    const urlChatId = searchParams.get("chat_id");
    if (urlChatId !== selectedId && urlChatId !== null && selectedId !== null) {
      setSelectedId(urlChatId);
    }
  }, [location]);

  //this useeffect sets the selectedChat variable
  React.useEffect(() => {
    if (selectedId !== null) {
      const chat = chats.find((item) => item?._id === selectedId);
      selectedChat = chat;

      getMessages(chat);
    }
  }, [selectedId]);

  // this useeffeect updates the title and favIcon when a notification is received
  React.useEffect(() => {
    const noOfUnreadMessages =
      chats.filter((chat) => {
        const ifUserHasRead = chat?.readBy?.filter(
          (item: any) => item?._id === user?._id
        );
        if (ifUserHasRead?.length === 0) return true;
        else return false;
      }).length ?? 0;
    setUnreadMessages(noOfUnreadMessages);
    if (noOfUnreadMessages) {
      changeFavicon(faviconNotification);
      document.title = `(${noOfUnreadMessages}) Messages | Chatme`;
    } else {
      changeFavicon(faviconNormal);
      document.title = "Messages | Chatme";
    }
  }, [chats]);

  //fetch chats
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
    if (selectedId === null) return;

    const res = await GET(AllMessages + chat?._id, user?.token);

    if (res) {
      //updateing messages
      setMessages(res);

      const userIds = (await chat?.readBy?.map((item: any) => item?._id)) ?? [];

      if (!userIds?.includes(user?._id)) {
        sendReadBy(chat?._id, [...userIds, user?._id]);

        socket.emit("read", {
          room: chat?._id,
          users: [...chat?.readBy, user]
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
    setMessageLoading(false);
    socket?.emit("join chat", selectedChat?._id);
  };

  //PUT request to update readByArray
  const sendReadBy = async (chatId: string, users: any[]) => {
    await PUT(
      ReadByUsers,
      {
        chatId: chatId,
        users: users
      },
      user?.token
    );
  };

  //POST send message
  const sendMessage = async (text: string, chatId: string) => {
    //validation
    if (!text || selectedId === null) return;

    const readByRes = await PUT(
      ReadByUsers,
      { chatId: selectedChat?._id, users: [user?._id] },
      user?.token
    );
    if (readByRes) {
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
        chatId: chatId
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
          if (item?._id === selectedChat?._id) {
            return { ...item, latestMessage: res };
          } else {
            return item;
          }
        });
        return updatedChats;
      });
    }
  };

  const openOptions = () => {
    navigate("/chat?chat_options");
    setOptions("options");
  };
  const openInfo = (chat: ChatModel = selectedChat) => {
    navigate("/chat?chat_profile");
    setInfoChat(chat);
    setOptions("info");
  };

  const selectedUserName =
    selectedId !== null
      ? selectedChat?.isGroupChat
        ? selectedChat?.chatName
        : selectedChat?.users?.find((item: any) => item?.email !== user?.email)
            ?.name
      : "Messages";

  const chatId: string = selectedChat?._id ?? "";

  return (
    <div className="home-main">
      <img src={noInternet} style={{ display: "none" }} />
      {/* dont touch this line above ^^^ */}
      {createChat ? (
        <Modal
          onClose={() => {
            setCreateChat(false);
            getChats();
          }}
        >
          <CreateChat close={() => setCreateChat(false)} />
        </Modal>
      ) : null}
      {options ? (
        <Modal
          onClose={() => {
            navigate(-1);
            setOptions(null);
          }}
        >
          {options === "options" ? (
            <Options openInfo={openInfo} onLogout={() => socket.disconnect()} />
          ) : (
            <ChatInfo chat={infoChat} />
          )}
        </Modal>
      ) : null}
      {!online ? (
        <Modal onClose={() => setOnline(true)}>
          <Offline />
        </Modal>
      ) : null}
      <Chatbar
        setModal={setCreateChat}
        loading={chatLoading}
        openInfo={(index) => openInfo(chats[index])}
        {...{
          chats,
          getChats,
          selectedId,
          setSelectedId,
          active,
          setActive,
          unreadMessages
        }}
      />
      <div className="home-content">
        <Topbar
          userName={selectedUserName ?? ""}
          openOptions={openOptions}
          {...{ setActive, unreadMessages }}
        />
        <div className="message-container">
          <MessagePanel
            noChatSelected={selectedId === null}
            loading={messageLoading}
            faded={active}
            readBy={
              chats
                ? chats
                    .find((item) => item?._id === selectedId)
                    ?.readBy?.filter((item: any) => item?._id !== user?._id) ??
                  []
                : []
            }
            closeChatbar={() => setActive(false)}
            {...{
              messages,
              sendMessage,
              user,
              socket,
              typing,
              chatId
            }}
          />
        </div>
      </div>
    </div>
  );
};
