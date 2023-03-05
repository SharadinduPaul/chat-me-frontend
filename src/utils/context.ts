import React from "react";
export const UserContext = React.createContext<{
  user: any;
  setUser: (input: any) => void;
}>({
  user: {},
  setUser: () => {},
});
