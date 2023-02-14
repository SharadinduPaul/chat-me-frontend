import React from "react";
import Lottie from "lottie-react";
import messageloading from "../../../../../assets/animated/messageLoading.json";
import social from "../../../../../assets/animated/social.json";
import empty from "../../../../../assets/animated/empty.json";
import "./styles.css";
import { Text } from "../../../../global";
import { send } from "../../../../../assets/images";

interface MessagePanelProps {
  noChatSelected: boolean;
  loading: boolean;
  messages: any[];
  sendMessage: (text: string) => void;
}
export const MessagePanel = ({
  noChatSelected,
  loading,
  messages,
  sendMessage,
}: MessagePanelProps) => {
  const [text, setText] = React.useState<string>("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    sendMessage(text);
    setText("");
  };
  return (
    <div className="message-panel">
      {noChatSelected ? (
        <div className="lottie-container">
          <Lottie animationData={social} style={{ height: "50vmin" }} />
          <Text varient="header3">Select/start a conversation</Text>
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
        <div className="message-container">
          {messages.map((item, index) => (
            <Text key={index}>something</Text>
          ))}
        </div>
      )}
      <form onSubmit={handleSubmit} className="message-send">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          type="text"
        />
        <button>
          <img src={send} alt="send" />
        </button>
      </form>
    </div>
  );
};
