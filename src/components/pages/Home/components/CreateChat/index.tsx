import React from "react";
import { Switch, Text } from "../../../../global";
import "./styles.css";

export const CreateChat = () => {
  const [groupChat, setGroupChat] = React.useState<boolean>(false);
  return (
    <div className={`createchat-main ${groupChat ? "group" : "personal"}`}>
      <Text varient="header3">Create personal/group chat</Text>
      <div className="group">
        <Text>Group chat</Text>
        <Switch
          varient="accent2"
          selected={groupChat}
          onClick={() => setGroupChat((prev) => !prev)}
        />
      </div>
      {groupChat ? (
        <input placeholder="Enter group name" type="text" maxLength={50} />
      ) : null}
      <input type="search" placeholder="Search for user" />
      <div className="button-container">
        <button>Create {groupChat ? "Group" : "Chat"}</button>
      </div>
    </div>
  );
};
