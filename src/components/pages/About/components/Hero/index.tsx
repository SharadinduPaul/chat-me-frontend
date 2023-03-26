import React from "react";
import { About1, About2, About3 } from "../../../../../assets/images";
import { Text } from "../../../../global";
import "./styles.css";

const heroImages = [About1, About2, About3];

export const Hero = () => {
  const [counter, setCounter] = React.useState<number>(0);
  React.useEffect(() => {
    setInterval(() => {
      setCounter((prev) => (prev === 2 ? 0 : prev + 1));
    }, 2000);
  }, []);
  return (
    <div className="hero-main">
      {heroImages?.map((image, index) => (
        <img
          src={image}
          alt={`About ${index + 1}`}
          className={
            counter === index
              ? "indisplay"
              : counter === (index - 1 < 0 ? heroImages.length - 1 : index - 1)
              ? "offdisplay"
              : ""
          }
        />
      ))}
      <div className="header">
        <h1>Chatme</h1>
        <h3>Realtime · Messaging · Calling</h3>
      </div>
    </div>
  );
};
