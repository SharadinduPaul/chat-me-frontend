import React from "react";
import Lottie from "lottie-react";
import { debounce } from "ts-debounce";
import { Message } from "../index";
import messageloading from "../../../../../assets/animated/messageLoading.json";
import social from "../../../../../assets/animated/social.json";
import hello from "../../../../../assets/animated/hello.json";
import { Text } from "../../../../global";
import { send } from "../../../../../assets/icons";
import { sentAtTime } from "../../../../../utils/formatTime";
import "./styles.css";

interface MessagePanelProps {
  noChatSelected: boolean;
  loading: boolean;
  messages: any[];
  sendMessage: (text: string, chatId: string) => void;
  user: any;
  faded?: boolean;
  socket: any;
  typing: boolean;
  chatId: string;
  readBy: any[];
  closeChatbar: () => void;
  isGroupChat?: boolean;
}
export const MessagePanel = ({
  noChatSelected,
  loading,
  messages,
  sendMessage,
  user,
  faded = false,
  socket,
  typing,
  chatId,
  readBy = [],
  isGroupChat = false,
  closeChatbar
}: MessagePanelProps) => {
  const msgRef = React.useRef<HTMLDivElement>(null);
  const textAreaRef = React.useRef<HTMLTextAreaElement>(null);

  let mytyping = false;

  React.useEffect(() => {
    if (!loading) {
      msgRef.current?.scrollTo(0, msgRef.current.offsetHeight + 1000000000);
    }
  }, [loading, messages, typing, readBy]);

  const emitStopTyping = async () => {
    if (mytyping) {
      await socket.emit("stop typing", chatId);
      mytyping = false;
      console.log("stop typing");
    }
  };

  const debouncedEmitStop = debounce(() => emitStopTyping(), 2000);

  const handleTyping = async () => {
    if (!mytyping) {
      mytyping = true;
      await socket.emit("typing", chatId);
      console.log("typing");
    }
    debouncedEmitStop();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      textAreaRef.current?.value.length === 0 ||
      !textAreaRef.current?.value
    ) {
      return;
    } else {
      sendMessage(textAreaRef.current.value, chatId);
      textAreaRef.current.value = "";
    }
  };
  return (
    <div
      className={`message-panel ${faded ? "faded" : ""}`}
      onClick={closeChatbar}
    >
      {noChatSelected ? (
        <div className="lottie-container">
          <Lottie animationData={social} style={{ height: "50vmin" }} />
          <Text varient="header3">Select or start a new conversation</Text>
        </div>
      ) : loading ? (
        <div className="lottie-container">
          <Lottie animationData={messageloading} style={{ height: "200px" }} />
        </div>
      ) : messages.length === 0 ? (
        <div className="lottie-container">
          <Lottie
            animationData={hello}
            style={{
              height: "50vmin",
              maxHeight: "300px",
              marginBottom: "1.2rem"
            }}
          />
          <Text varient="header3">Say Hello!</Text>
        </div>
      ) : (
        <div ref={msgRef} className="message-container">
          <div className="end-guide">
            <Text faded>
              Your messages and calls are end-to-end encrypted. No one, not even
              chatme, can access your personal data.
            </Text>
          </div>
          {messages.map((item, index) => {
            const isImage =
              messages[index]?.sender?.email !==
              messages[index + 1]?.sender?.email;
            const topFlat =
              index > 0
                ? messages[index]?.sender?.email !==
                  messages[index - 1]?.sender?.email
                : true;
            return (
              <Message
                text={item?.content}
                key={index}
                received={item?.sender?.email !== user?.email}
                isImage={isImage}
                sentAt={sentAtTime(item?.updatedAt)}
                topRounded={!topFlat}
                image_url={item?.sender?.pic}
                senderName={item?.sender?.name}
                isGroupChat={isGroupChat}
              />
            );
          })}
        </div>
      )}
      {typing ? (
        <Text className="read-by" varient="content2" italic faded>
          Typing...
        </Text>
      ) : readBy.length > 0 && chatId ? (
        <Text className="read-by" varient="content2" faded>
          Read
        </Text>
      ) : null}
      {/* {typing ? <Message received typing isImage /> : null} */}
      {!noChatSelected ? (
        <div className="message-send">
          <textarea
            ref={textAreaRef}
            maxLength={1000}
            placeholder="Type here"
            onChange={(e) => {
              handleTyping();
            }}
          />
          <button onClick={handleSubmit}>
            <img src={send} alt="send" />
          </button>
        </div>
      ) : null}
    </div>
  );
};
