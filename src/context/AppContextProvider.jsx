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

  // const productsList = [
  //   {
  //     id: 1,
  //     name: "Fresh Tomatoes",
  //     price: 40,
  //     category: "Fruits&Berries",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvfGVufDB8fDB8fHww",
  //       "https://plus.unsplash.com/premium_photo-1724256185670-ab944897f4bc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dG9tYXRvJTIwc2luZ2xlJTIwcGhvdG98ZW58MHx8MHx8fDA%3D",
  //       "https://plus.unsplash.com/premium_photo-1724849418322-9a95d378cd14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHRvbWF0byUyMHNpbmdsZSUyMHBob3RvfGVufDB8fDB8fHww",
  //       "https://images.unsplash.com/photo-1705948734831-5775d06d93b4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHRvbWF0byUyMHNpbmdsZSUyMHBob3RvfGVufDB8fDB8fHww",
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Organic Spinach",
  //     price: 30,
  //     category: "Leafy Greens",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
  //       "https://images.unsplash.com/photo-1578283326173-fbb0f83b59b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
  //       "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwaW5hY2h8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1651427660796-1bc57aafa229?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
  //     ],
  //   },
  //   {
  //     id: 3,
  //     name: "Carrots",
  //     price: 50,
  //     category: "Root Vegetables",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://images.unsplash.com/photo-1639086495429-d60e72c53c81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHN8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1536534692336-1dc9e76ed9c6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGNhcnJvdCUyMHNpbmdsZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  //       "https://images.unsplash.com/photo-1742887214150-31a6c3d8acb8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2Fycm90JTIwc2luZ2xlJTIwaW1hZ2VzfGVufDB8fDB8fHww",
  //       "https://images.unsplash.com/photo-1603117869492-9f217038e19a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fGNhcnJvdCUyMHNpbmdsZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
  //     ],
  //   },
  //   {
  //     id: 4,
  //     name: "Broccoli",
  //     price: 80,
  //     category: "Vegetables",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YnJvY29sbGl8ZW58MHx8MHx8fDA%3D",
  //       "https://plus.unsplash.com/premium_photo-1724250161295-ccb9c5f4f63d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YnJvY29sbGl8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1594885270039-f8871b502f7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnJvY29sbGl8ZW58MHx8MHx8fDA%3D",
  //     ],
  //   },
  //   {
  //     id: 5,
  //     name: "Organic Spinach",
  //     price: 30,
  //     category: "Leafy Greens",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://media.istockphoto.com/id/1322565117/photo/fresh-spinach-leaves-on-wooden-cutting-board-on-old-dark-wooden-table-background-top-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=ka9P9nvZ8p0Mju59cLY0TjA9Q2iuALbzYiQOXqDunkU=",
  //       "https://images.unsplash.com/photo-1578283326173-fbb0f83b59b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
  //       "https://images.unsplash.com/photo-1634731201932-9bd92839bea2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwaW5hY2h8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1651427660796-1bc57aafa229?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
  //     ],
  //   },
  //   {
  //     id: 6,
  //     name: "Banana",
  //     price: 30,
  //     category: "Fruits & Berries",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmFuYW5hfGVufDB8fDB8fHww",
  //       "https://plus.unsplash.com/premium_photo-1724250081106-4bb1be9bf950?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGJhbmFuYXxlbnwwfHwwfHx8MA%3D%3D",
  //       "https://images.unsplash.com/photo-1528825871115-3581a5387919?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmFuYW5hfGVufDB8fDB8fHww",
  //       "https://plus.unsplash.com/premium_photo-1724250081102-cab0e5cb314c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmFuYW5hfGVufDB8fDB8fHww",
  //     ],
  //   },
  //   {
  //     id: 7,
  //     name: "Strawberry",
  //     price: 30,
  //     category: "Fruits & Berries",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://images.unsplash.com/photo-1518635017498-87f514b751ba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHN0cmF3YmVycnl8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1622921491193-345ffb510f6f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHN0cmF3YmVycnl8ZW58MHx8MHx8fDA%3D",
  //       "https://images.unsplash.com/photo-1568966299181-bb7282cc84f0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHN0cmF3YmVycnl8ZW58MHx8MHx8fDA%3D",
  //       "https://plus.unsplash.com/premium_photo-1724256148318-388029ff4dd4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3RyYXdiZXJyeXxlbnwwfHwwfHx8MA%3D%3D",
  //     ],
  //   },
  //   {
  //     id: 8,
  //     name: "tumeric",
  //     price: 30,
  //     category: "Herbs & Spices",
  //     description: [
  //       "High-quality material",
  //       "Comfortable for everyday use",
  //       "Available in different sizes",
  //     ],
  //     images: [
  //       "https://images.unsplash.com/photo-1666818398897-381dd5eb9139?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHVybWVyaWN8ZW58MHx8MHx8fDA%3D",
  //       "https://media.istockphoto.com/id/965503302/photo/turmeric-powder-and-roots.webp?a=1&b=1&s=612x612&w=0&k=20&c=qPvZkqSeowmUFeAS2CsHp9o68LbAH51zSZfbN4TDoT8=",
  //       "https://media.istockphoto.com/id/1248945590/photo/turmeric-powder-and-turmeric-root-on-a-blue-background-with-curry-leaves-top-view-of.webp?a=1&b=1&s=612x612&w=0&k=20&c=PNY5tNENTTVyTcvInr_yTGZhOjf42MXS5pUP3W1eHB4=",
  //       "https://plus.unsplash.com/premium_photo-1725467479028-dda98dddb915?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHR1cm1lcmljfGVufDB8fDB8fHww",
  //     ],
  //   },
  // ];

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

  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProducts();
  }, []);
  
  //update database cartItems
  const updateCart = async () => {
    try {
      const { data } = await axios.post("/api/cart/update",{cartItems});
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
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
