import React from "react";
import { Modal } from "../../global";
import { Chatbar } from "./components/Chatbar";
import { CreateChat } from "./components/CreateChat";
import { Topbar } from "./components/Topbar";
import "./styles.css";

export const Home = () => {
  const [modal, setModal] = React.useState<boolean>(false);

  return (
    <div className="home-main">
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <CreateChat />
        </Modal>
      ) : null}
      <Chatbar setModal={setModal} />
      <div className="home-content">
        <Topbar />
        <div className="message-container"></div>
      </div>
    </div>
  );
};
