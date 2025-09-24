import "./SellerLogin.css";
import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";

export const SellerLogin = () => {
  const { isSeller, setIsSeller, navigate } = useAppContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setIsSeller(true);
  };

  useEffect(() => {
    if (isSeller) {
      navigate("/seller");
    }
  }, [isSeller, navigate]);
  return (
    !isSeller && (
      <form onSubmit={onSubmitHandler} className="form-container">
        <div>
          <p className="form-title">
            <span className="highlight">Seller</span> Login
          </p>
          <div className="form-group">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Name"
              type="email"
              required
            />
          </div>
          <div className="form-group">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="password"
              type="password"
              required
            />
          </div>
          <button className="submit-btn">Login</button>
        </div>
      </form>
    )
  );
};
