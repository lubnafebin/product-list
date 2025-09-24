import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { CartPage } from "./pages/CartPage";
import { Login } from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import { ProductDetails } from "./pages/ProductDetails";
import { MyOrders } from "./pages/MyOrders";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext();
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<MyOrders />} />
      </Routes>
    </div>
  );
}

export default App;
