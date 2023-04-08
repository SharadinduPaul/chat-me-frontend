import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { Registration } from "../../../../../apis";
import { close as closePNG } from "../../../../../assets/icons";
import { UserContext } from "../../../../../utils/context";
import { POST } from "../../../../../utils/fetch";
import { signUpValidation } from "../../../../../utils/validation";
import { Button, Input, Switch, Text } from "../../../../global";
import loadingPlane from "../../../../../assets/animated/loading-plane.json";
import "./styles.css";

interface SignupProps {
  active: boolean;
  setLoginActive: () => void;
  close: () => void;
}
export const Signup = ({ active, close, setLoginActive }: SignupProps) => {
  const [data, setData] = React.useState<{
    name: string;
    email: string;
    password: string;
    confirm: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [loading, setLoading] = React.useState<"loading" | "done" | null>(null);
  const [error, setError] = React.useState<
    { errLocation: string; errMessage: string } | undefined
  >(undefined);

  const { user, setUser, rememberMe, setRememberMe } =
    React.useContext(UserContext);

  const navigate = useNavigate();

  const changeData = (key: string, value: string) => {
    setData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();

    //validating the input data
    const hasError = signUpValidation(data.name, data.email, data.password);
    if (hasError) {
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    //comparing password and confirm password
    if (data.password !== data.confirm) {
      setError({
        errLocation: "password",
        errMessage: "Password doesn't match with confirm password"
      });
      return;
    }

    setLoading("loading");

    //making the signup POST request
    const res = await POST(
      Registration,
      {
        name: data.name,
        email: data.email,
        password: data.password
      },
      user?.token
    );
    //validating the API response
    if (res?.token) {
      setLoading("done");
      setUser(res);
      setTimeout(() => {
        navigate("/profile?skippable=true");
      }, 800);
    } else {
      setError({ errLocation: "main", errMessage: "Signup failed" });
      setLoading(null);
    }
  };
  return (
    <form
      onSubmit={handleSignUpSubmit}
      className={`${active ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={closePNG} alt="close" className="close" onClick={close} />
      <Text varient="header1">
        Signup for a{" "}
        <span style={{ color: "var(--color-accent)", font: "inherit" }}>
          new
        </span>{" "}
        account
      </Text>
      {error?.errLocation === "main" ? (
        <Text className="error">{error.errMessage}</Text>
      ) : null}
      {loading === "done" ? <Text>Signup successful</Text> : null}
      <Input
        placeHolder="Name"
        name="name"
        value={data.name}
        onChange={(e) => changeData("name", e?.target?.value)}
        showError={error?.errLocation === "name"}
        errorMessage={error?.errMessage}
        completed={loading !== null}
      />
      <Input
        placeHolder="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => changeData("email", e?.target?.value)}
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
        showError={error?.errLocation === "password"}
        errorMessage={error?.errMessage}
        completed={loading !== null}
      />
      <Input
        placeHolder="Confirm Password"
        type="password"
        name="comfirm password"
        value={data.confirm}
        onChange={(e) => changeData("confirm", e?.target?.value)}
        completed={loading !== null}
      />
      {loading !== null ? (
        <div className="lottie-container">
          <Lottie animationData={loadingPlane} style={{ height: "16rem" }} />
        </div>
      ) : null}
      <div
        className="keep-me-logged-in"
        style={{
          opacity: rememberMe ? "1" : "0.4",
          pointerEvents: loading ? "none" : "all"
        }}
      >
        <Text varient="content2">Keep me logged in </Text>
        <Switch
          selected={rememberMe}
          onClick={() => setRememberMe((prev) => !prev)}
        />
      </div>
      <Button style={{ marginTop: "2rem" }} type="submit">
        Signup
      </Button>
      <Text varient="content2">
        Already have an account? <span onClick={setLoginActive}>Login</span>{" "}
        instead
      </Text>
    </form>
  );
};
