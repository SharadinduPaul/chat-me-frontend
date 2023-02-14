import React from "react";
import { menu } from "../../../../../assets/images";
import { getUser } from "../../../../../utils/handleUser";
import { Text } from "../../../../global";
import "./styles.css";

interface TopbarProps {
  setActive: (input: boolean) => void;
}
export const Topbar = ({ setActive }: TopbarProps) => {
  const user = getUser();
  return (
    <div className="topbar-main">
      <img src={menu} alt="menu" onClick={() => setActive(true)} />
      <Text>{user?.name}</Text>
    </div>
  );
};
