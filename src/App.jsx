import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { CartPage } from "./pages/CartPage";
import { Login } from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

function App() {
  const isSellerPath = useLocation().pathname.includes("seller");
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      {isSellerPath ? null : <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
