import React from "react";
import { Search } from "../../../../../apis";
import { user } from "../../../../../assets/images";
import { debounce } from "../../../../../utils/debounce";
import { GET, POST } from "../../../../../utils/fetch";
import { CreateChat as CC, CreateGroup as CG } from "../../../../../apis";
import { Switch, Text } from "../../../../global";
import "./styles.css";
import { UserContext } from "../../../../../utils/context";

interface UserOptionProps {
  image_url?: string;
  name: string;
  email: string;
  onClick: () => void;
}
const UserOption = ({ image_url, name, email, onClick }: UserOptionProps) => {
  return (
    <div className="useroption-main" onClick={onClick}>
      <img src={image_url ?? user} alt="user" />
      <div>
        <Text varient="content2">{name}</Text>
        <Text varient="content3">{email}</Text>
      </div>
    </div>
  );
};

export const CreateChat = ({ close }: { close: () => void }) => {
  const [groupChat, setGroupChat] = React.useState<boolean>(false);
  const [groupName, setGroupName] = React.useState<string>("");
  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);
  const [userOptions, setUserOptions] = React.useState(false);

  const { user } = React.useContext(UserContext);

  let search = "";

  React.useEffect(() => {
    if (!groupChat) {
      setSelectedUsers([]);
    }
  }, [groupChat]);

  const removeSelectedUser = (user: any) => {
    setSelectedUsers((prev) =>
      prev.filter((item) => item?.email !== user?.email)
    );
  };
  const addSelectedUser = (user: any) => {
    if (!groupChat && selectedUsers.length > 0) {
      console.log("Switch to group chat for adding more users");
      return;
    }
    setSelectedUsers((prev) => {
      const isUserPresent =
        prev.findIndex((item) => item?.email === user?.email) !== -1;
      if (!isUserPresent) {
        return [...prev, user];
      } else {
        return prev;
      }
    });
  };

  const handleSearch = async () => {
    const res = await GET(Search + `search=${search}`, user?.token);
    if (res) {
      setUsers(res);
    }
  };
  const debouncedSearch = debounce(() => handleSearch(), 500);

  const createChat = async () => {
    const userId = selectedUsers[0]?._id;
    if (!userId) return;
    const res = await POST(
      CC,
      {
        userId,
      },
      user?.token
    );
    close();
  };
  const createGroupChat = async () => {
    if (groupName.length < 2) return;
    if (selectedUsers.length < 1) return;
    const userId = selectedUsers.map((item) => item?._id);

    const res = await POST(
      CG,
      {
        name: groupName,
        users: JSON.stringify(userId),
      },
      user?.token
    );
    close();
  };

  return (
    <div
      className={`createchat-main ${groupChat ? "group" : "personal"}`}
      onClick={() => setUserOptions(false)}
    >
      <Text varient="header3">Create personal/group chat</Text>
      <div className="group">
        <Text faded={!groupChat}>Group chat</Text>
        <Switch
          varient="accent2"
          selected={groupChat}
          onClick={() => setGroupChat((prev) => !prev)}
        />
      </div>
      {groupChat ? (
        <input
          placeholder="Enter group name"
          type="text"
          maxLength={50}
          onChange={(e) => setGroupName(e.target.value)}
        />
      ) : null}
      {selectedUsers.length > 0 ? (
        <div className="selected-users">
          {selectedUsers.map((item, index) => (
            <Text
              key={index}
              varient="content2"
              onClick={() => removeSelectedUser(item)}
            >
              {item?.name}
            </Text>
          ))}
        </div>
      ) : null}
      <div
        className="search-user"
        onFocus={() => setUserOptions(true)}
        onClick={(e) => e.stopPropagation()}
      >
        <input
          type="search"
          onChange={(e) => {
            search = e.target.value;
            debouncedSearch();
          }}
          placeholder="Search for user"
        />
        {userOptions && users.length > 0 ? (
          <div className="users">
            {users.map((item, index) => (
              <UserOption
                key={index}
                name={item?.name}
                email={item?.email}
                onClick={() => addSelectedUser(item)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div className="button-container">
        <button onClick={() => (groupChat ? createGroupChat() : createChat())}>
          Create {groupChat ? "Group" : "Chat"}
        </button>
      </div>
    </div>
  );
};
