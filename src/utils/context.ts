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
  setUser: (input: UserModal) => void;
}>({
  user: {},
  setUser: () => {}
});
