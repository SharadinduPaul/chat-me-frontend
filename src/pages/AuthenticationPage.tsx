import React from "react";
import { Authentication } from "../components/pages/Authentication";

export const AuthenticationPage = ({ login = false }: { login?: boolean }) => {
  return <Authentication login={login} />;
};
