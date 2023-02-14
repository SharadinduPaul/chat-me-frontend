import React from "react";
import { useNavigate } from "react-router-dom";
import { Login, Registration } from "../../../apis";
import { UserContext } from "../../../utils/context";
import { POST } from "../../../utils/fetch";
import { loginValidation, signUpValidation } from "../../../utils/validation";
import { Text } from "../../global";
import "./styles.css";

export const Authentication = ({ login = false }: { login?: boolean }) => {
  const [signup, setSignup] = React.useState<boolean>(!login);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [auth, setAuth] = React.useState<boolean>(false);
  const [error, setError] = React.useState<
    { errLocation: string; errMessage: string } | undefined
  >(undefined);
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    document.title = signup
      ? "Register New Account - Chatme"
      : "Log into your account - Chatme";
  }, [signup]);

  const handleSignUpSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    //validating the input data
    const hasError = signUpValidation(
      e?.target[0]?.value,
      e?.target[1]?.value,
      e?.target[2]?.value
    );
    if (hasError) {
      setLoading(false);
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    //making the signup POST request
    const res = await POST(Registration, {
      name: e.target[0]?.value,
      email: e.target[1]?.value,
      password: e.target[2]?.value,
    },
    user?.token);
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
  const handleLogInSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    //validating the input data
    const hasError = loginValidation(e?.target[0]?.value, e?.target[1]?.value);
    if (hasError) {
      setLoading(false);
      setError(hasError);
      return;
    } else {
      setError(undefined);
    }

    //making the login POST request
    const res = await POST(Login, {
      email: e.target[0]?.value,
      password: e.target[1]?.value,
    }, user?.token);

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
    <div className="authentication-main">
      <form
        className="authentication-card"
        style={{ transform: signup ? "rotateY(0deg)" : "rotateY(180deg)" }}
        onSubmit={handleSignUpSubmit}
      >
        <Text varient="header2" className="heading">
          {auth ? (
            <>
              Sign up <p>successful</p>
            </>
          ) : error?.errLocation === "main" ? (
            <>
              Sign up <p id="failed">failed</p>
            </>
          ) : (
            <>
              Sign up for a <p>new</p> account
            </>
          )}
        </Text>
        <input
          className={error?.errLocation === "name" ? "inputErr" : ""}
          type="text"
          name="name"
          placeholder="Name"
          autoFocus
        />
        {error?.errLocation === "name" && (
          <Text varient="content2" className="error">
            {error?.errMessage}
          </Text>
        )}
        <input
          className={error?.errLocation === "email" ? "inputErr" : ""}
          type="email"
          name="email"
          placeholder="Email"
        />
        {error?.errLocation === "email" && (
          <Text varient="content2" className="error">
            {error?.errMessage}
          </Text>
        )}
        <input
          className={error?.errLocation === "password" ? "inputErr" : ""}
          type="password"
          name="password"
          placeholder="Password"
        />
        {error?.errLocation === "password" && (
          <Text varient="content2" className="error">
            {error?.errMessage}
          </Text>
        )}
        <Text varient="content2" className="toggle" italic>
          Already have an account?
          <span className="toggleSignup" onClick={() => setSignup(false)}>
            Login
          </span>
          instead
        </Text>
        <button type="submit" disabled={loading}>
          <Text varient="header3">Sign up</Text>
        </button>
      </form>
      <form
        className="authentication-card"
        style={{ transform: signup ? "rotateY(180deg)" : "rotateY(360deg)" }}
        onSubmit={handleLogInSubmit}
      >
        <Text varient="header2" className="heading">
          {auth ? (
            <>
              Login <p>successful</p>
            </>
          ) : error?.errLocation === "main" ? (
            <>
              Login <p id="failed">failed</p>
            </>
          ) : (
            <>
              Login to <p>your</p> account
            </>
          )}
        </Text>
        <input
          className={error?.errLocation === "email" ? "inputErr" : ""}
          type="email"
          name="email"
          placeholder="Email"
        />
        {error?.errLocation === "email" && (
          <Text varient="content2" className="error">
            {error?.errMessage}
          </Text>
        )}
        <input
          className={error?.errLocation === "password" ? "inputErr" : ""}
          type="password"
          name="password"
          placeholder="Password"
        />
        {error?.errLocation === "password" && (
          <Text varient="content2" className="error">
            {error?.errMessage}
          </Text>
        )}
        <Text varient="content2" className="toggle" italic>
          Don't have an account?
          <span className="toggleSignup" onClick={() => setSignup(true)}>
            Signup
          </span>
          instead
        </Text>
        <button type="submit" disabled={loading}>
          <Text varient="header3">Login</Text>
        </button>
      </form>
    </div>
  );
};
