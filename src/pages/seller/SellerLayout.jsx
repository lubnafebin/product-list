import logo from "../../assets/logo.png";
import "./SellerLayout.css";
import { useAppContext } from "../../context/AppContext";
import { FaList, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";

export const SellerLayout = () => {
  const { setIsSeller } = useAppContext();
  const sidebarLinks = [
    {
      name: "Add Product",
      path: "/seller",
      icon: "/icons/plus.png",
    },
    {
      name: "Product List",
      path: "/seller/product-list",
      icon: "/icons/list.png",
    },
    {
      name: "Orders",
      path: "/seller/orders",
      icon: "/icons/order.png",
    },
  ];

  const logout = async () => {
    setIsSeller(false);
  };

  return (
    <div>
      <div className="navbar">
        <Link to="/">
          <img className="logo" src={logo} alt="logo" />
        </Link>
        <div className="navbar-right">
          <p>Hi! Admin</p>
          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        {sidebarLinks.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/seller"}
            className={({ isActive }) =>
              `sidebar-link ${isActive === 0 ? "active" : ""}`
            }
          >
            <img src={item.icon} alt={`${item.name} icon`} className="icon" />
            <p className="link-text">{item.name}</p>
          </NavLink>
        ))}
      </div>
      <Outlet />
    </div>
  );
};
