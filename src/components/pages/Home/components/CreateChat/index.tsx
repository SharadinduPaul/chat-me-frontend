import React from "react";
import { Search } from "../../../../../apis";
import { GET, POST } from "../../../../../utils/fetch";
import { CreateChat as CC, CreateGroup as CG } from "../../../../../apis";
import { Button, Input, Switch, Text, UserImage } from "../../../../global";
import { UserContext } from "../../../../../utils/context";
import "./styles.css";
import { debounce } from "ts-debounce";

interface UserOptionProps {
  image_url?: string;
  name: string;
  email: string;
  onClick: () => void;
}
const UserOption = ({ image_url, name, email, onClick }: UserOptionProps) => {
  return (
    <div className="useroption-main" onClick={onClick}>
      <UserImage imageUrl={image_url} />
      <div>
        <Text varient="content2">{name}</Text>
        <Text varient="content3" faded>
          {email}
        </Text>
      </div>
    </div>
  );
};

interface SelectedUserProps {
  image_url: string;
  name: string;
  onClick: () => void;
}
const SelectedUser = ({ image_url, name, onClick }: SelectedUserProps) => {
  return (
    <div className="selected-user" onClick={onClick}>
      <UserImage imageUrl={image_url} rounded />
      <Text varient="content3">{name}</Text>
    </div>
  );
};

export const CreateChat = ({ close }: { close: () => void }) => {
  const [groupChat, setGroupChat] = React.useState<boolean>(false);
  const [groupName, setGroupName] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = React.useState<any[]>([]);
  const [userOptions, setUserOptions] = React.useState(false);

  const { user } = React.useContext(UserContext);

  let searchText = "";

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
      setSelectedUsers([user]);
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
    const res = await GET(Search + `search=${searchText}`, user?.token);
    if (res) {
      setUsers(res);
    }
  };
  const debouncedSearch = debounce(handleSearch, 800);

  const createChat = async () => {
    const userId = selectedUsers[0]?._id;
    if (!userId) return;
    await POST(
      CC,
      {
        userId
      },
      user?.token
    );
    close();
  };
  const createGroupChat = async () => {
    if (groupName.length < 2) return;
    if (selectedUsers.length < 1) return;
    const userId = selectedUsers.map((item) => item?._id);

    await POST(
      CG,
      {
        name: groupName,
        users: JSON.stringify(userId)
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
        <Input
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          placeHolder="Group name"
          maxLength={69}
          color={groupChat ? "accent2" : "accent1"}
          faded
        />
      ) : null}
      {selectedUsers.length > 0 ? (
        <div className="selected-users">
          {selectedUsers.map((item, index) => (
            <SelectedUser
              key={index}
              image_url={item?.pic}
              name={item?.name}
              onClick={() => removeSelectedUser(item)}
            />
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
          placeholder="Search for user"
          onChange={(e) => {
            searchText = e.target.value;
            debouncedSearch();
          }}
        />
        {userOptions && users.length > 0 ? (
          <div className="users">
            {users.map((item, index) => (
              <UserOption
                key={index}
                name={item?.name}
                email={item?.email}
                image_url={item?.pic}
                onClick={() => addSelectedUser(item)}
              />
            ))}
          </div>
        ) : null}
      </div>
      <div style={{ flex: 1 }} />
      <Button
        onClick={() => (groupChat ? createGroupChat() : createChat())}
        color={groupChat ? "accent2" : "accent1"}
      >
        Create {groupChat ? "Group" : "Chat"}
      </Button>
    </div>
  );
};
