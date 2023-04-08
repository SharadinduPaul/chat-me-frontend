import React from "react";
import { UserModal } from "../apis/models";

export interface UserInterface {
  name?: string;
  email?: string;
  pic?: string;
  token?: string;
  _id?: string;
}
export const UserContext = React.createContext<{
  user: UserModal;
  setUser: React.Dispatch<React.SetStateAction<UserInterface>>;
  rememberMe: boolean;
  setRememberMe: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  user: {},
  setUser: () => {},
  rememberMe: true,
  setRememberMe: () => {}
});
