import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import { useAppContext } from "../../context/AppContext";
import { useEffect, useState } from "react";
import "./Navbar.css";
import toast from "react-hot-toast";

export const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const {
    user,
    setUser,
    setShowUserLogin,
    navigate,
    // cartItems,
    searchQuery,
    setSearchQuery,
    axios,
  } = useAppContext();
  // const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      const productSection = document.getElementById("product-section");
      if (productSection) {
        productSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [searchQuery]);

  return (
    <div className="navbar">
      {/* Logo */}
      <div className="logo" onClick={() => navigate("/")}>
        <img src={logo} alt="logo" />
        <span className="logo-text">VeggieCart</span>
      </div>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="search-btn">
          <FaSearch />
        </button>
      </div>

      {/* Actions */}
      <div className="actions">
        {/* Cart */}
        <button className="icon-btn cart-btn" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {/* {cartCount > 0 && <span className="cart-badge">{cartCount}</span>} */}
        </button>

        {/* User */}
        {!user ? (
          <button className="login-btn" onClick={() => setShowUserLogin(true)}>
            Login
          </button>
        ) : (
          <div className="user-menu">
            <button
              className="icon-btn"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <FaUser />
            </button>
            {dropdownOpen && (
              <div className="dropdown">
                <a onClick={() => navigate("my-orders")}>My order</a>
                <button onClick={logout}>Logout</button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
