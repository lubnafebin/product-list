import logo from "../../assets/logo.png";
import "./SellerLayout.css";
import { useAppContext } from "../../context/AppContext";
import { FaList, FaPlus, FaShoppingCart } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import toast from "react-hot-toast";

export const SellerLayout = () => {
  const { axios, navigate } = useAppContext();
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
    try {
      const { data } = await axios.get("/api/seller/logout");
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="logo-content">
          <Link to="/">
            <img className="logo" src={logo} alt="logo" />
            <span className="logo-text">VeggieCart</span>
          </Link>
        </div>
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
              `sidebar-link ${isActive ? "active" : ""}`
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
