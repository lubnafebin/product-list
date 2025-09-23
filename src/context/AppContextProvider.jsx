import React, { useState } from "react";
import toast from "react-hot-toast";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [cartItems, setCartItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState([]);


  //add to cart
  const addToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
     toast.success("Added to Cart", {
      icon: <FaCheckCircle className="text-green-500" />,
    });
  };
  //clear cart
  const clearCart = () => setCartItems([]);

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
    cartItems,
    setCartItems,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    clearCart,
    searchQuery,
    setSearchQuery
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
