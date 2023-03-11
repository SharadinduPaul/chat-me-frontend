import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UserContext } from "../../../utils/context";
import { Button, Footer, Input, Modal, Text } from "../../global";
import { deletePng, edit, user as userPNG } from "../../../assets/images";
import "./styles.css";
import { ImageUploader } from "./components/ImageUploader";

interface ProfileProps {
  //   skippable: boolean;
}
export const Profile = ({}: ProfileProps) => {
  const { user } = React.useContext(UserContext);
  const [name, setName] = React.useState<string>(user?.name ?? "");
  const [email, setEmail] = React.useState<string>(user?.email ?? "");
  const [image, setImage] = React.useState<string>(user?.pic ?? "");
  const [modal, setModal] = React.useState<boolean>(false);

  const skippable = useSearchParams()[0].get("skippable");
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Edit Profile - Chatme";
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleEdit = () => {
    setModal(true);
  };

  const handleDelete = () => {
    setImage("");
  };

  const handleSave = async () => {
    console.log("name:", name);
    console.log("email:", email);
    console.log("image:", image);
  };
  return (
    <div className="profile-main">
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <ImageUploader
            close={() => setModal(false)}
            setUserImage={setImage}
          />
        </Modal>
      ) : null}
      <form onSubmit={handleSubmit} className="profile-container">
        <div className="image-container">
          <img
            className="user-image"
            src={image}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null;
              currentTarget.src = String(userPNG);
            }}
          />
          <img className="option edit" onClick={handleEdit} src={edit} alt="" />
          {!!image ? (
            <img
              className="option delete"
              src={deletePng}
              alt=""
              onClick={handleDelete}
            />
          ) : null}
        </div>
        <Input
          placeHolder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          placeHolder="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled
        />
        <div className="button-container">
          <Button color="accent2" onClick={() => navigate("/")}>
            {skippable ? "Skip" : "Cancel"}
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
