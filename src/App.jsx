import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { CartPage } from "./pages/CartPage";
import { Login } from "./components/login/Login";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext";
import { ProductDetails } from "./pages/ProductDetails";
import { MyOrders } from "./pages/MyOrders";
import { SellerLogin } from "./components/seller/SellerLogin";
import { SellerLayout } from "./pages/seller/SellerLayout";
import { AddProduct } from "./pages/seller/AddProduct";
import { ProductList } from "./pages/seller/ProductList";
import { Orders } from "./pages/seller/Orders";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();
  return (
    <div style={{ height: "100%", color: "gray", background: "white" }}>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster position="top-right" reverseOrder={false} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/products/:category/:id" element={<ProductDetails />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route
          path="/seller"
          element={isSeller ? <SellerLayout /> : <SellerLogin />}
        >
          <Route index element={isSeller ? <AddProduct /> : null} />
          <Route path="product-list" element={<ProductList />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
