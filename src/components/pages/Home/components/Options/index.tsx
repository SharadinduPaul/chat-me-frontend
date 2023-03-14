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

  const handleAbout = () => {
    navigate("/about");
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
      <div>
        <img src={info} alt="info" />
        <Text>Info</Text>
        <Text varient="content3" faded italic>
          - View all users, created at, and other chat details
        </Text>
      </div>
      <div onClick={handleAbout}>
        <img src={setting} alt="profile" />
        <Text>About us</Text>
        <Text varient="content3" faded italic>
          - Our journey and testimonials
        </Text>
      </div>
      <div onClick={handleChangePassword}>
        <img src={password} alt="profile" />
        <Text>Change password</Text>
        <Text varient="content3" faded italic></Text>
      </div>
      <div onClick={handleLogout}>
        <img src={logout} alt="logout" />
        <Text>Log out</Text>
        <Text varient="content3" faded italic></Text>
      </div>
    </div>
  );
};
