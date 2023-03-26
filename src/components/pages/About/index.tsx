import React from "react";
import { Text } from "../../global";
import { Hero } from "./components/Hero";
import "./styles.css";

export const About = () => {
  React.useEffect(() => {
    document.title = "About | Chatme";
  }, []);

  return (
    <div className="about-main">
      <Hero />
      <div className="content">
        <Text varient="header3">About</Text>
        <Text faded>
          Welcome to ChatMe's About Page! At ChatMe, we believe that
          communication is essential, and we're passionate about providing a
          platform for people to connect in real-time. ChatMe is a chat and
          video call app that brings people together from all over the world.
          <br />
          <br />
          Whether you're catching up with old friends, meeting new ones, or
          collaborating on projects, ChatMe is the perfect platform for you. Our
          app is easy to use and provides a seamless experience, allowing you to
          focus on the conversation at hand. With ChatMe, you can make free
          video calls and send messages to anyone, anywhere in the world,
          without worrying about fees or restrictions. Our app is designed to
          work on any device, so you can stay connected whether you're on the go
          or at home. We take user privacy and security seriously, and that's
          why we've implemented end-to-end encryption on all our communications.
          <br />
          <br />
          This means that your messages and calls are protected from prying
          eyes, so you can have peace of mind knowing that your conversations
          are safe and secure. At ChatMe, we're committed to providing a quality
          user experience. We're constantly working on improving our app, adding
          new features, and fixing any issues that arise. Our support team is
          always available to help you with any questions or concerns you may
          have.
          <br /> Thank you for choosing ChatMe. We look forward to connecting
          with you!
        </Text>
      </div>
    </div>
  );
};
