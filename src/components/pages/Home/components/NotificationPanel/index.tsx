import React from "react";
import { Text } from "../../../../global";
import "./styles.css";

interface NotificationPanelProps {
  active: boolean;
  notifications: any[];
}
export const NotificationPanel = ({
  active,
  notifications,
}: NotificationPanelProps) => {
  return (
    <div className={`notification-main ${active ? "active" : ""}`}>
      {!!notifications && notifications.length > 0 ? (
        <></>
      ) : (
        <Text faded>No notifications</Text>
      )}
    </div>
  );
};
