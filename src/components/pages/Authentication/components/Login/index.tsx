import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { close as closePNG } from "../../../../../assets/images";
import { Login as LoginAPI } from "../../../../../apis";
import { UserContext } from "../../../../../utils/context";
import { POST } from "../../../../../utils/fetch";
import { loginValidation } from "../../../../../utils/validation";
import { Button, Input, Text } from "../../../../global";
import loadingPlane from "../../../../../assets/animated/loading-plane.json";
import "./styles.css";

interface LoginProps {
  active: boolean;
  setSignupActive: () => void;
  close: () => void;
}
export const Login = ({ active, setSignupActive, close }: LoginProps) => {
  const [data, setData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = React.useState<"loading" | "done" | null>(null);
  const [auth, setAuth] = React.useState<boolean>(false);
  const [error, setError] = React.useState<
    { errLocation: string; errMessage: string } | undefined
  >(undefined);
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const changeData = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };
  const handleLogInSubmit = async (e: any) => {
    e.preventDefault();
    //validating the input data
    const hasError = loginValidation(data.email, data.password);
    if (hasError) {
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    setLoading("loading");

    //making the login POST request
    const res = await POST(
      LoginAPI,
      {
        email: data.email,
        password: data.password
      },
      user?.token
    );

    //validating the API response
    if (res?.token) {
      setLoading("done");
      setUser(res);
      setAuth(true);
      setTimeout(() => {
        navigate("/chat");
      }, 1000);
    } else {
      setError({ errLocation: "main", errMessage: "Failed to login" });
      setLoading(null);
    }
  };
  return (
    <form
      onSubmit={handleLogInSubmit}
      className={`${active ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={closePNG} alt="close" className="close" onClick={close} />
      <Text varient="header1">
        Login to an{" "}
        <span style={{ color: "var(--color-accent2)", font: "inherit" }}>
          existing
        </span>{" "}
        account
      </Text>
      {error?.errLocation === "main" ? (
        <Text className="error">{error.errMessage}</Text>
      ) : null}
      {loading === "done" ? <Text>Login successful</Text> : null}
      <Input
        placeHolder="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => changeData("email", e?.target?.value)}
        color="accent2"
        showError={error?.errLocation === "email"}
        errorMessage={error?.errMessage}
        completed={loading !== null}
      />
      <Input
        placeHolder="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={(e) => changeData("password", e?.target?.value)}
        color="accent2"
        showError={error?.errLocation === "password"}
        errorMessage={error?.errMessage}
        completed={loading !== null}
      />
      {loading !== null ? (
        <div className="lottie-container">
          <Lottie animationData={loadingPlane} style={{ height: "16rem" }} />
        </div>
      ) : null}
      <Button style={{ marginTop: "2rem" }} color="accent2" type="submit">
        Login
      </Button>
      <Text varient="content2">
        Don't have an account? <span onClick={setSignupActive}>Signup</span>{" "}
        instead
      </Text>
    </form>
  );
};
