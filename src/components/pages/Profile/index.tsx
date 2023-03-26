import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Lottie from "lottie-react";
import loader from "../../../assets/animated/loading-balls.json";
import { UserContext } from "../../../utils/context";
import { Button, Footer, Input, Modal, Text } from "../../global";
import { deletePng, edit, user as userPNG } from "../../../assets/icons";
import { ImageUploader } from "./components/ImageUploader";
import "./styles.css";
import { POST } from "../../../utils/fetch";
import { UpdateProfile } from "../../../apis";

interface ProfileProps {
  //   skippable: boolean;
}
export const Profile = ({}: ProfileProps) => {
  const { user, setUser } = React.useContext(UserContext);

  const [file, setFile] = React.useState<any>(null);
  const [name, setName] = React.useState<string>(user?.name ?? "");
  const [image, setImage] = React.useState<string>(user?.pic ?? "");

  const [error, setError] = React.useState<{
    errLocation: "name" | null;
    errMessage: string;
  }>({ errLocation: null, errMessage: "" });
  const [modal, setModal] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<"uploading" | "done" | null>(
    null
  );

  const skippable = useSearchParams()[0].get("skippable");
  const navigate = useNavigate();

  React.useEffect(() => {
    document.title = "Your Profile | Chatme";
  }, []);

  React.useEffect(() => {
    if (loading === "done") {
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    }
  }, [loading]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const setSelectedImageFile = (fileData: any, imageData: string) => {
    setFile(fileData);
    setImage(imageData);
  };

  const handleEdit = () => {
    setModal(true);
  };

  const handleDelete = () => {
    setImage("");
  };

  const handleSave = async () => {
    console.log("name:", name);
    console.log("image:", file);
    if (name.length === 0) {
      setError({
        errLocation: "name",
        errMessage: "Please enter a valid name"
      });
      return;
    }
    setError({
      errLocation: null,
      errMessage: ""
    });

    setLoading("uploading");

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name);

    const res = await fetch(UpdateProfile, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + user?.token
      }
    })
      .then((data) => data.json())
      .catch((e) => console.log(e));

    console.log("profile update res", res);

    if (res) {
      setLoading("done");
      setUser(res);
    } else {
      setLoading(null);
    }
  };
  return (
    <div className="profile-main">
      {modal ? (
        <Modal onClose={() => setModal(false)}>
          <ImageUploader
            close={() => setModal(false)}
            setUserImage={setSelectedImageFile}
          />
        </Modal>
      ) : null}
      <form onSubmit={handleSubmit} className="profile-container">
        <Text varient="header3">
          {loading === null
            ? skippable
              ? "Add your profile picture"
              : "Profile"
            : loading === "uploading"
            ? file
              ? "Uploading image..."
              : "Saving data..."
            : "Almost done!"}
        </Text>
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
          {loading === null ? (
            <img
              className="option edit"
              onClick={handleEdit}
              src={edit}
              alt=""
            />
          ) : null}
          {!!image && loading === null ? (
            <img
              className="option delete"
              src={deletePng}
              alt=""
              onClick={handleDelete}
            />
          ) : null}
        </div>
        <div></div>
        <Input
          placeHolder="Name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          showError={error.errLocation === "name"}
          errorMessage={error.errMessage}
          completed={loading !== null}
        />
        <Input
          placeHolder="Email"
          name="email"
          value={user?.email}
          disabled
          completed={loading !== null}
        />
        <div />
        {loading === "uploading" ? (
          <div className="lottie-container">
            <Lottie animationData={loader} style={{ height: "10rem" }} />
          </div>
        ) : loading === "done" ? (
          <div className="lottie-container">
            <Lottie animationData={loader} style={{ height: "10rem" }} />
          </div>
        ) : null}
        <div className="button-container">
          <Button color="accent2" onClick={() => navigate("/chat")}>
            {skippable ? "Skip for now" : "Return home"}
          </Button>
          <Button disabled={loading === "uploading"} onClick={handleSave}>
            Save
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};
