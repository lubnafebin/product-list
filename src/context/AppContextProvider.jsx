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

  const products = [
    {
      id: 1,
      name: "Fresh Tomatoes",
      price: 40,
      category: "Fruits&Berries",
      image:
        "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvfGVufDB8fDB8fHww",
    },
    {
      id: 2,
      name: "Organic Spinach",
      price: 30,
      category: "Leafy Greens",
      image:
        "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
    },
    {
      id: 3,
      name: "Carrots",
      price: 50,
      category: "Root Vegetables",
      image:
        "https://images.unsplash.com/photo-1639086495429-d60e72c53c81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 4,
      name: "Broccoli",
      price: 80,
      category: "Vegetables",
      image:
        "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 5,
      name: "Organic Spinach",
      price: 30,
      category: "Leafy Greens",
      image:
        "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
    },
    {
      id: 6,
      name: "Banana",
      price: 30,
      category: "Fruits & Berries",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFuYW5hfGVufDB8fDB8fHww",
    },
    {
      id: 7,
      name: "Strawberry",
      price: 30,
      category: "Fruits & Berries",
      image:
        "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0cmF3YmVycnl8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 8,
      name: "tumeric",
      price: 30,
      category: "Herbs & Spices",
      image:
        "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHVybWVyaWN8ZW58MHx8MHx8fDA%3D",
    },
  ];
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
    setSearchQuery,
    products,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
