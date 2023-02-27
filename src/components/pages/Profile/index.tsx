import React from "react";
import { useSearchParams } from "react-router-dom";
import { Footer, Input, Text } from "../../global";
import "./styles.css";

interface ProfileProps {
  //   skippable: boolean;
}
export const Profile = ({}: ProfileProps) => {
  const [name, setName] = React.useState<string>("");
  const skippable = useSearchParams()[0].get("skippable");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="profile-main">
      <form onSubmit={handleSubmit} className="profile-container">
        <Input
          placeHolder="Name"
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          showError={true}
          errorMessage={"this is wrong"}
          color="accent1"
          autoFocus
        />
      </form>
      <Footer />
    </div>
  );
};
