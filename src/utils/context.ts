import React from "react";

export interface UserInterface {
  name?: string;
  email?: string;
  pic?: string;
  token?: string;
  _id?: string;
}
export const UserContext = React.createContext<{
  user: UserInterface;
  setUser: (input: UserInterface) => void;
}>({
  user: {},
  setUser: () => {}
});
