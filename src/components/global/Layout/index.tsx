import React from "react";
import { Outlet } from "react-router-dom";
import "./styles.css";

interface LayoutProps {
  children?: any;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-main">
      <Outlet />
      {children}
    </div>
  );
};
