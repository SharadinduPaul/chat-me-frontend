import React from "react";
import { useSearchParams } from "react-router-dom";
import { Verify as VerifyAPI } from "../../../apis";
import { UserContext } from "../../../utils/context";
import { POST } from "../../../utils/fetch";
import { Text } from "../../global";
import "./styles.css";

export const Verify = () => {
  const { user } = React.useContext(UserContext);
  const [searchParams] = useSearchParams();
  const hash = searchParams.get("hash");
  const email = searchParams.get("email");

  React.useEffect(() => {
    handleVerify();
  }, []);

  const handleVerify = async () => {
    const res = await POST(
      VerifyAPI,
      {
        hash,
        email
      },
      user?.token ?? ""
    );
    console.log("verified res", res);
  };

  return (
    <div>
      <Text>Verifying...</Text>
    </div>
  );
};
