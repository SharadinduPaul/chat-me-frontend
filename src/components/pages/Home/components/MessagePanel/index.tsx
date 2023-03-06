import React from "react";
import Lottie from "lottie-react";
import messageloading from "../../../../../assets/animated/messageLoading.json";
import social from "../../../../../assets/animated/social.json";
import empty from "../../../../../assets/animated/empty.json";
import { Text } from "../../../../global";
import { send } from "../../../../../assets/images";
import { Message } from "../Message";
import { debounce } from "../../../../../utils/debounce";
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
  closeChatbar,
}: MessagePanelProps) => {
  const [text, setText] = React.useState<string>("");
  const msgRef = React.useRef<HTMLDivElement>(null);
  let mytyping = false;

  React.useEffect(() => {
    if (!loading) {
      msgRef.current?.scrollTo(0, msgRef.current.offsetHeight + 1000000000);
    }
  }, [loading, messages, typing]);

  const emitStopTyping = async () => {
    if (mytyping) {
      await socket.emit("stop typing", chatId);
      mytyping = false;
    }
  };
  const debouncedEmitStop = debounce(() => emitStopTyping(), 3000);
  const handleTyping = async (e: any) => {
    setText(e.target.value);

    if (!mytyping) {
      mytyping = true;
      await socket.emit("typing", chatId);
    }
    debouncedEmitStop();
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (text.length === 0) {
      return;
    }
    sendMessage(text, chatId);
    setText("");
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
          <Lottie animationData={empty} style={{ height: "40vmin" }} />
          <Text varient="header3">No message found. Send a message?</Text>
        </div>
      ) : (
        <div ref={msgRef} className="message-container">
          <div style={{ flex: "1" }}></div>
          {messages.map((item, index) => {
            const isImage =
              messages[index]?.sender?.email !==
              messages[index + 1]?.sender?.email;
            return (
              <Message
                text={item?.content}
                key={index}
                received={item?.sender?.email !== user?.email}
                isImage={isImage}
              />
            );
          })}
        </div>
      )}
      {readBy.length > 0 ? (
        <Text className="read-by" varient="content2" faded>
          Read
        </Text>
      ) : null}
      {typing ? <Message received typing isImage /> : null}
      {!noChatSelected ? (
        <form onSubmit={handleSubmit} className="message-send">
          <input
            value={text}
            max={500}
            placeholder="Type here"
            onChange={handleTyping}
            type="text"
          />
          <button type="submit">
            <img src={send} alt="send" />
          </button>
        </form>
      ) : null}
    </div>
  );
};
