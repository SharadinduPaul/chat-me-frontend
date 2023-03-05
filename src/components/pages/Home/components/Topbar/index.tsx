import React from "react";
import Lottie from "lottie-react";
import { menu, options, bell } from "../../../../../assets/images";
import bellLottie from "../../../../../assets/animated/bell.json";
import { Text } from "../../../../global";
import "./styles.css";

interface TopbarProps {
  setActive: (input: boolean) => void;
  openOptions: () => void;
  userName: string;
}
export const Topbar = ({ setActive, userName, openOptions }: TopbarProps) => {
  return (
    <div className="topbar-main">
      <div>
        <img
          src={menu}
          className="menu"
          alt="menu"
          onClick={() => setActive(true)}
        />
      </div>
      <Text className="name" style={{ fontSize: "17px", fontWeight: "500" }}>
        {userName}
      </Text>
      <img src={options} alt="dots" className="options" onClick={openOptions} />
    </div>
  );
};
