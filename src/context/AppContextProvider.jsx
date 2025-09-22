import React, { useState } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    cartCount,
    setCartCount,
    selectedCategory,
    setSelectedCategory
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
