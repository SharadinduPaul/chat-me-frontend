import React from "react";
import { useNavigate } from "react-router-dom";
import {
  info,
  logout,
  password,
  profile,
  setting
} from "../../../../../assets/images";
import { UserContext } from "../../../../../utils/context";
import { removeUser } from "../../../../../utils/handleUser";
import { Text } from "../../../../global";
import "./styles.css";

export const Options = () => {
  const { setUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleInfo = () => {
    navigate("/chat-info");
  };

  const handleSettings = () => {
    navigate("/settings");
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    removeUser();
    setUser({});
    navigate("/auth");
  };

  return (
    <div className="options-main">
      <div onClick={handleInfo}>
        <img src={info} alt="info" />
        <Text>Info</Text>
      </div>
      <div onClick={handleSettings}>
        <img src={setting} alt="profile" />
        <Text>Settings</Text>
      </div>
      <div onClick={handleChangePassword}>
        <img src={password} alt="profile" />
        <Text>Change password</Text>
      </div>
      <div onClick={handleLogout}>
        <img src={logout} alt="logout" />
        <Text>Log out</Text>
      </div>
    </div>
  );
};
