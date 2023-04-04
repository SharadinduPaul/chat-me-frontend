import React from "react";
import { menu, options } from "../../../../../assets/icons";
import { Text } from "../../../../global";
import "./styles.css";

interface TopbarProps {
  setActive: (input: boolean) => void;
  openOptions: () => void;
  userName: string;
  unreadMessages: number;
}
export const Topbar = ({
  setActive,
  userName,
  openOptions,
  unreadMessages
}: TopbarProps) => {
  return (
    <div className="topbar-main">
      <div className="menu-button" onClick={() => setActive(true)}>
        <img src={menu} alt="menu" />
        {unreadMessages > 0 ? <div className="red-dot" /> : null}
      </div>
      <Text className="name" style={{ fontSize: "17px", fontWeight: "500" }}>
        {userName}
      </Text>
      <img src={options} alt="dots" className="options" onClick={openOptions} />
    </div>
  );
};
