import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [cartCount, setCartCount] = useState(2);
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState([]);

  //fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-auth");
      if (data.success) {
        setIsSeller(true);
      } else {
        setIsSeller(false);
      }
    } catch {
      setIsSeller(false);
    }
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems);
      }
    } catch {
      setUser(null);
    }
  };

  //fetch products
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data) {
        setProducts(data.products);
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.success(error.message);
    }
  };

  //add to cart
  const addToCart = (product) => {
    if (!user) {
      setShowUserLogin(true);
      return;
    }
    const existing = cartItems.find((item) => item._id === product._id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id
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

  //get cart item count
  const getCartCount = () => {
    return cartItems.length;
  };

  //get cart total amount
  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);

  //update database cartItems
  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update", { cartItems });
      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (user) {
      updateCart();
    }
  }, [cartItems]);

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
    axios,
    fetchProducts,
    getCartAmount,
    getCartCount,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
