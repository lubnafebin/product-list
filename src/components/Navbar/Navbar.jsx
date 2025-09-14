import { FaSearch, FaShoppingCart, FaUser } from "react-icons/fa";
import "./Navbar.css";
import logo from "./logo.png";
export const Navbar = () => {
  return (
    <>
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <span className="logo-text">VeggieCart</span>
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search items..." />
          <button className="search-btn">
            <FaSearch />
          </button>
        </div>

        <div className="actions">
          <div className="cart">
            <FaShoppingCart />
            <span className="cart-text">Cart</span>
          </div>
          <div className="login">
            <FaUser />
            <span>Login</span>
          </div>
        </div>
      </div>
    </>
  );
};
