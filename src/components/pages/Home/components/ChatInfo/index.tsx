import React from "react";
import { back, block, group, mute } from "../../../../../assets/images";
import { UserContext } from "../../../../../utils/context";
import { sentAtTime } from "../../../../../utils/formatTime";
import { Button, Text, UserImage } from "../../../../global";
import "./styles.css";

interface ChatInfoProps {
  chat: any;
}
export const ChatInfo = ({ chat }: ChatInfoProps) => {
  const { user } = React.useContext(UserContext);

  const [data, setData] = React.useState<{
    name: string;
    email?: string;
    createdAt: string;
    imageUrl: string;
  }>({
    name: "",
    imageUrl: "",
    email: "",
    createdAt: ""
  });

  React.useEffect(() => {
    if (!chat) return;
    if (chat?.isGroupChat) {
      setData({
        name: chat?.chatName,
        imageUrl: String(group),
        createdAt: sentAtTime(chat?.createdAt).split("/")[0]
      });
    } else {
      const receiver = chat?.users?.filter(
        (item: any) => item?.email !== user?.email
      )[0];
      setData({
        name: receiver?.name,
        imageUrl: receiver?.pic,
        createdAt: sentAtTime(chat?.createdAt).split("/")[0],
        email: receiver?.email
      });
    }
  }, []);
  return (
    <div className="chat-info">
      {chat ? (
        <>
          <UserImage imageUrl={data.imageUrl} rounded />
          <Text varient="header3">{data.name}</Text>
          {data?.email ? <Text faded>{data?.email}</Text> : null}
          <div className="flex">
            <Text varient="content2" faded italic>
              Chat created on
            </Text>
            <Text varient="content2" italic>
              {data?.createdAt}
            </Text>
          </div>
          <div className="button-container">
            <Button className="block">
              <img src={block} className="btn-image" />
              Block
            </Button>
            <Button>
              <img src={mute} className="btn-image" />
              Mute
            </Button>
          </div>
        </>
      ) : (
        <>
          <UserImage imageUrl={user?.pic} rounded />
          <Text varient="header3" style={{ alignSelf: "center" }}>
            Welcome, {user?.name?.split(" ")[0]}
          </Text>
          <Text faded>
            Get started by selected an existing chat, or create a new chat by
            clicking on the New Chat button from the chat panel
          </Text>
        </>
      )}
    </div>
  );
};
