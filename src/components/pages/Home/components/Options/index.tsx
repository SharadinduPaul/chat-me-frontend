import React from "react";
import { useNavigate } from "react-router-dom";
import { info, logout, profile, setting } from "../../../../../assets/images";
import { UserContext } from "../../../../../utils/context";
import { removeUser } from "../../../../../utils/handleUser";
import { Text } from "../../../../global";
import "./styles.css";

export const Options = () => {
  const { user, setUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    removeUser();
    setUser({});
    navigate("/login");
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
      <div>
        <img src={profile} alt="profile" />
        <Text>Profile</Text>
        <Text varient="content3" faded italic>
          - View or edit your profile details
        </Text>
      </div>
      <div>
        <img src={setting} alt="profile" />
        <Text>About us</Text>
        <Text varient="content3" faded italic>
          - Our journey and testimonials
        </Text>
      </div>
      <div onClick={handleLogout}>
        <img src={logout} alt="logout" />
        <Text>Log out</Text>
      </div>
    </div>
  );
};
