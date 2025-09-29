import "./CartPage.css";
import toast from "react-hot-toast";
import { CartItem } from "../components/cart/CartItem";
import { useAppContext } from "../context/AppContext";
import { FaCheckCircle } from "react-icons/fa";
import { useEffect, useState } from "react";

export const CartPage = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const {
    setCartItems,
    cartItems,
    getCartCount,
    navigate,
    getCartAmount,
    user,
    axios,
  } = useAppContext();

  const placeOrder = async () => {};
  //update cart quantity
  const updateCartQuantity = (id, newQty) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };
  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from Cart", {
      icon: <FaCheckCircle className="text-green-500" />,
    });
  };
  //api integration
  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.address.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <div className="cart-container">
          {/* Left Side - Cart Items */}
          <div className="cart-items">
            <h1 className="cart-title">
              Review Cart{" "}
              <span className="cart-subtitle">{getCartCount()}</span>
            </h1>

            <div className="cart-header">
              <p>Product Details</p>
              <p>Subtotal</p>
              <p>Action</p>
            </div>

            {/* Render only cart rows */}
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                removeFromCart={removeFromCart}
                updateCartQuantity={updateCartQuantity}
              />
            ))}

            <button onClick={() => navigate("/")} className="continue-btn">
              ← Continue Shopping
            </button>
          </div>

          {/* Right Side - Order Summary */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <hr />

            <div className="summary-section">
              <p className="section-title">Delivery Address</p>
              <div className="address-box">
                <p>
                  {selectedAddress
                    ? `${selectedAddress.street},${selectedAddress.city},${selectedAddress.country},${selectedAddress.state}`
                    : "No address found"}
                </p>
                <button
                  onClick={() => setShowAddress(!showAddress)}
                  className="link-btn"
                >
                  Change
                </button>
                {showAddress && (
                  <div className="address-dropdown">
                    {addresses.map((address, index) => (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedAddress(address);
                          setShowAddress(false);
                        }}
                      >
                        {address.street},{address.city},{address.state},
                        {address.country},
                      </p>
                    ))}
                    <p onClick={() => navigate("add-address")}>+ Add address</p>
                  </div>
                )}
              </div>

              <p className="section-title">Payment Method</p>
              <select onChange={(e) => setPaymentOption(e.target.value)}>
                <option value="COD">Cash On Delivery</option>
                <option value="Online">Online Payment</option>
              </select>
            </div>

            <hr />

            <div className="price-summary">
              <p>
                <span>Price</span> <span>${getCartAmount()}</span>
              </p>
              <p>
                <span>Shipping Fee</span> <span className="green">Free</span>
              </p>
              <p>
                <span>Tax (2%)</span>{" "}
                <span>${(getCartAmount() * 2) / 100}</span>
              </p>
              <p className="total">
                <span>Total Amount:</span>{" "}
                <span>${getCartAmount() + (getCartAmount() * 2) / 100}</span>
              </p>
            </div>
            <button onClick={placeOrder} className="place-order-btn">
              {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
