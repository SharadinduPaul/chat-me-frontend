import Lottie from "lottie-react";
import React from "react";
import { Footer, Text } from "../../global";
import notFound from "../../../assets/animated/404.json";
import "./styles.css";

export const PageNotFound = () => {
  React.useEffect(() => {
    document.title = "Oops! Page not found";
  }, []);

  return (
    <div className="page-not-found">
      <div></div>
      <Lottie animationData={notFound} style={{ height: "80vh" }} />
      <Footer />
    </div>
  );
};
