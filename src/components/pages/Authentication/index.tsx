import React from "react";
import { useNavigate } from "react-router-dom";
import { Registration } from "../../../apis";
import { Text } from "../../global";
import "./styles.css";

export const Authentication = ({ login = false }: { login?: boolean }) => {
  const [signup, setSignup] = React.useState(!login);
  // const navigate = useNavigate();
  React.useEffect(() => {
    document.title = signup ? "Register New Account" : "Log into your account";
  }, [signup]);

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(Registration, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target[0]?.value,
        email: e.target[1]?.value,
        password: e.target[2]?.value,
      }),
    })
      .then((res) => res.json())
      .catch((err) => console.log("error", err));
    console.log(res);
  };
  const handleLogInSubmit = async (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="authentication-main">
      <form
        className="authentication-card"
        style={{ transform: signup ? "rotateY(0deg)" : "rotateY(180deg)" }}
        onSubmit={handleSignUpSubmit}
      >
        <Text varient="header2">Sign up for a new account</Text>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">
          <Text varient="header3">Sign up</Text>
        </button>
      </form>
      <form
        className="authentication-card"
        style={{ transform: signup ? "rotateY(180deg)" : "rotateY(360deg)" }}
        onSubmit={handleLogInSubmit}
      >
        <Text varient="header2">Login</Text>
        <input type="text" />
        <button type="submit">
          <Text varient="header3">Login</Text>
        </button>
      </form>
    </div>
  );
};
