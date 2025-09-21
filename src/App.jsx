import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Home } from "./pages/Home";
import { CartPage } from "./pages/CartPage";
import { Login } from "./pages/LoginPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
