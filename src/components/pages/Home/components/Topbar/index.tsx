import React from "react";
import { getUser } from "../../../../../utils/handleUser";
import { Text } from "../../../../global";
import "./styles.css";

export const Topbar = () => {
  const user = getUser();
  return (
    <div className="topbar-main">
      <Text>{user?.name}</Text>
    </div>
  );
};
