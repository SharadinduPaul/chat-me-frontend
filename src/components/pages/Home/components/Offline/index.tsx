import React from "react";
import { noInternet } from "../../../../../assets/images";
import { Text } from "../../../../global";
import "./styles.css";

export const Offline = () => {
  return (
    <div className="offline-main">
      <img src={noInternet} alt="Offline" />
      <Text varient="header3">No internet</Text>
      <Text faded>
        Your device is offline
        <br />
        Check your internet connection.
      </Text>
      <Text varient="content2" faded>
        We would recommend you to reload this page once you're online.
      </Text>
    </div>
  );
};
