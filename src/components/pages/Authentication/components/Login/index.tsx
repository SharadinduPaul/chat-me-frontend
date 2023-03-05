import React from "react";
import { useNavigate } from "react-router-dom";
import { Login as LoginAPI } from "../../../../../apis";
import { UserContext } from "../../../../../utils/context";
import { POST } from "../../../../../utils/fetch";
import { loginValidation } from "../../../../../utils/validation";
import { Button, Input, Text } from "../../../../global";
import "./styles.css";

interface LoginProps {
  active: boolean;
  setSignupActive: () => void;
}
export const Login = ({ active, setSignupActive }: LoginProps) => {
  const [data, setData] = React.useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = React.useState<boolean>(false);
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
    setLoading(true);
    //validating the input data
    const hasError = loginValidation(data.email, data.password);
    if (hasError) {
      setLoading(false);
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    //making the login POST request
    const res = await POST(
      LoginAPI,
      {
        email: data.email,
        password: data.password,
      },
      user?.token
    );

    //validating the API response
    if (res?.token) {
      setUser(res);
      setAuth(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } else {
      setError({ errLocation: "main", errMessage: "Signup failed" });
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleLogInSubmit}
      className={`${active ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Text varient="header1">
        Login to an{" "}
        <span style={{ color: "var(--color-accent2)", font: "inherit" }}>
          existing
        </span>{" "}
        account
      </Text>
      <Input
        placeHolder="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => changeData("email", e?.target?.value)}
        color="accent2"
      />
      <Input
        placeHolder="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={(e) => changeData("password", e?.target?.value)}
        color="accent2"
      />
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
