import React, { useState } from "react";
import { AppContext } from "./AppContext";

export const AppContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);

  const value = { user, setUser, isSeller, setIsSeller };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
