import React from "react";
import Lottie from "lottie-react";
import { menu, options, bell } from "../../../../../assets/images";
import bellLottie from "../../../../../assets/animated/bell.json";
import { Text } from "../../../../global";
import "./styles.css";

interface TopbarProps {
  setActive: (input: boolean) => void;
  userName: string;
  notifications: any[];
}
export const Topbar = ({ setActive, userName, notifications }: TopbarProps) => {
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
      <div className="notfication">
        {notifications.length > 0 ? (
          <Lottie animationData={bellLottie} style={{ height: "2.2rem" }} />
        ) : (
          <img src={bell} className="bell" />
        )}
      </div>
      <img src={options} alt="dots" className="options" />
    </div>
  );
};
