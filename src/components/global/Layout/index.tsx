import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getUser } from "../../../utils/handleUser";
import "./styles.css";

interface LayoutProps {
  children?: any;
}
export const Layout = ({ children }: LayoutProps) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const user = getUser();
    if (!user?.token) {
      navigate("/");
    }
  }, []);
  return (
    <div className="layout-main">
      <Outlet />
      {children}
    </div>
  );
};
