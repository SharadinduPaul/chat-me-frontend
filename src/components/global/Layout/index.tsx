import React from "react";
import { Outlet } from "react-router-dom";
// import { Sidebar, Topbar } from "../index";
import "./styles.css";

interface LayoutProps {
  children?: any;
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout-main">
      {/* <Sidebar /> */}
      <div className="layout-content">
        {/* <Topbar /> */}
        <Outlet />
        {children}
      </div>
    </div>
  );
};
