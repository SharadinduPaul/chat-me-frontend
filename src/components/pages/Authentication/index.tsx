import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../../utils/context";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Button, Footer, Text } from "../../global";
import authpage from "../../../assets/animated/authPage.json";
import authpage2 from "../../../assets/animated/authPage2.json";
import authpage3 from "../../../assets/animated/authPage3.json";
import { Login as LoginAPI } from "../../../apis";
import { POST } from "../../../utils/fetch";
import { faviconNormal } from "../../../assets/icons";
import { changeFavicon } from "../../../utils/changeFavicon";
import "./styles.css";

export const Authentication = () => {
  const [signup, setSignup] = React.useState<"login" | "signup" | null>(null);

  const banner1 = React.useRef<HTMLDivElement>(null);
  const banner2 = React.useRef<HTMLDivElement>(null);
  const banner3 = React.useRef<HTMLDivElement>(null);

  const { user, setUser } = React.useContext(UserContext);

  const navigate = useNavigate();

  React.useEffect(() => {
    changeFavicon(faviconNormal);

    if (banner1.current) {
      const observer = new IntersectionObserver((e) => {
        banner1.current?.classList.toggle("show", e[0]?.isIntersecting);
      });
      observer.observe(banner1.current);
    }
    if (banner2.current) {
      const observer = new IntersectionObserver((e) => {
        banner2.current?.classList.toggle("show", e[0]?.isIntersecting);
      });
      observer.observe(banner2.current);
    }
    if (banner3.current) {
      const observer = new IntersectionObserver((e) => {
        banner3.current?.classList.toggle("show", e[0]?.isIntersecting);
      });
      observer.observe(banner3.current);
    }
  }, []);

  React.useEffect(() => {
    document.title =
      signup === "signup"
        ? "Register New Account - Chatme"
        : signup === "login"
        ? "Log into your account - Chatme"
        : "Welcome to Chatme";
  }, [signup]);

  const handleGuest = async () => {
    const res = await POST(
      LoginAPI,
      {
        email: "guest@streamify.co.in",
        password: "guest"
      },
      user?.token
    );
    //validating the API response
    if (res?.token) {
      setUser(res);
      setTimeout(() => {
        navigate("/chat");
      }, 800);
    }
  };

  return (
    <div className="authentication-main" onClick={() => setSignup(null)}>
      <div className="chatme-banner">
        <Lottie animationData={authpage} style={{ height: "60vh" }} />
        <div className="banner-text" ref={banner1}>
          <Text varient="header1">
            Hi, welcome to{" "}
            <span style={{ color: "var(--color-accent2)" }}>Chat</span>
            <span style={{ color: "var(--color-accent)" }}>me</span>
          </Text>
          <Text varient="content1" faded>
            Whether you're looking to catch up with a loved one, with
            colleagues, or simply hang out with friends, our app makes it easy
            to stay connected and engaged.
            <br />
            Scroll down for a quick insight or rather Login to explore yourself.
          </Text>
          {user?.token ? (
            <Button
              style={{ marginTop: "2rem" }}
              color="accent2"
              onClick={() => navigate("/chat")}
            >
              Continue as {user?.name}
            </Button>
          ) : (
            <Button
              style={{ marginTop: "2rem" }}
              color="accent2"
              onClick={handleGuest}
            >
              Continue as Guest
            </Button>
          )}
        </div>
      </div>
      <div className="chatme-banner">
        <Lottie animationData={authpage3} style={{ height: "50vh" }} />
        <div className="banner-text" ref={banner2}>
          <Text varient="header1">Real-time messaging</Text>
          <Text varient="content1" faded>
            Chatme provides a unique messaging experience that prioritizes
            privacy, customization, across multiple devices, meaning that you
            can continue your conversations from wherever you left off, whether
            on your phone, tablet, or desktop.
          </Text>
        </div>
      </div>
      <div className="chatme-banner">
        <Lottie animationData={authpage2} style={{ height: "50vh" }} />
        <div className="banner-text" ref={banner3}>
          <Text varient="header1">Seamless Audio & Video calling</Text>
          <Text varient="content1" faded>
            Chatme offers an intuitive interface that allows you to easily
            initiate audio or video calls with a single click. With high-quality
            video and audio technology, you can communicate with crystal-clear
            clarity, ensuring that every word is heard and every detail is seen.
            <br />
            It provides a reliable, secure, and convenient way to connect
          </Text>
        </div>
      </div>
      <Login
        active={signup === "login"}
        setSignupActive={() => setSignup("signup")}
        close={() => setSignup(null)}
      />
      <Signup
        active={signup === "signup"}
        setLoginActive={() => setSignup("login")}
        close={() => setSignup(null)}
      />
      <div
        className={`auth-button-container ${signup === null ? "active" : ""}`}
      >
        <button
          className="open-login"
          onClick={(e) => {
            setSignup("login");
            e.stopPropagation();
          }}
        >
          <div className="bg" />
          <Text varient="header3">Login</Text>
        </button>
        <button
          className="open-about"
          onClick={() => {
            navigate("/about");
          }}
        >
          <div className="bg" />
          <Text varient="header3">About</Text>
        </button>
      </div>
      <Footer />
    </div>
  );
};
