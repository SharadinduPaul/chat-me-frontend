import React from "react";
import { useNavigate } from "react-router-dom";
import { Registration } from "../../../../../apis";
import { UserContext } from "../../../../../utils/context";
import { POST } from "../../../../../utils/fetch";
import { signUpValidation } from "../../../../../utils/validation";
import { Button, Input, Text } from "../../../../global";
import "./styles.css";

interface SignupProps {
  active: boolean;
  setLoginActive: () => void;
}
export const Signup = ({ active, setLoginActive }: SignupProps) => {
  const [data, setData] = React.useState<{
    name: string;
    email: string;
    password: string;
    confirm: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirm: "",
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

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    //validating the input data
    const hasError = signUpValidation(data.name, data.email, data.password);
    if (hasError) {
      setLoading(false);
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    //making the signup POST request
    const res = await POST(
      Registration,
      {
        name: data.name,
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
        // navigate("/profile?skipable=true");
      }, 3000);
    } else {
      setError({ errLocation: "main", errMessage: "Signup failed" });
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSignUpSubmit}
      className={`${active ? "active" : ""}`}
      onClick={(e) => e.stopPropagation()}
    >
      <Text varient="header1">
        Signup for a{" "}
        <span style={{ color: "var(--color-accent)", font: "inherit" }}>
          new
        </span>{" "}
        account
      </Text>
      <Input
        placeHolder="Name"
        name="name"
        value={data.name}
        onChange={(e) => changeData("name", e?.target?.value)}
        errorMessage="Please enter a valid name"
      />
      <Input
        placeHolder="Email"
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => changeData("email", e?.target?.value)}
      />
      <Input
        placeHolder="Password"
        type="password"
        name="password"
        value={data.password}
        onChange={(e) => changeData("password", e?.target?.value)}
      />
      <Input
        placeHolder="Confirm Password"
        type="password"
        name="comfirm password"
        value={data.confirm}
        onChange={(e) => changeData("confirm", e?.target?.value)}
      />
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
