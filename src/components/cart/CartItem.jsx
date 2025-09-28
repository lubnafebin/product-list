import { useEffect, useState } from "react";
import "./CartItem.css";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

export const CartItem = ({ item, removeFromCart, updateCartQuantity }) => {
  // const address = [
  //   {
  //     _id: 1,
  //     firstName: "jon",
  //     lastName: "doe",
  //     email: "j@gmail.com",
  //     street: "abc",
  //     city: "xyz",
  //     state: "yz",
  //     country: "australia",
  //     zipcode: 1234,
  //     phone: "9087654321",
  //   },
  //   {
  //     _id: 2,
  //     firstName: "jon",
  //     lastName: "doe",
  //     email: "j@gmail.com",
  //     street: "abc",
  //     city: "xyz",
  //     state: "yz",
  //     country: "australia",
  //     zipcode: 1234,
  //     phone: "9087654321",
  //   },
  // ];

  const [showAddress, setShowAddress] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");
  const { getCartCount, getCartAmount, navigate, cartItems, axios, user } =
    useAppContext();

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

  const placeOrder = async () => {};

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return (
    <div className="cart-container">
      {/* Left Side - Cart Items */}
      <div className="cart-items">
        <h1 className="cart-title">
          Review Cart <span className="cart-subtitle">{getCartCount()}</span>
        </h1>

        <div className="cart-header">
          <p>Product Details</p>
          <p>Subtotal</p>
          <p>Action</p>
        </div>

        <div className="cart-row">
          <div className="cart-product">
            <div className="cart-image">
              <img src={item.images[0]} alt={item.name} />
            </div>
            <div>
              <p className="product-name">{item.name}</p>
              <p className="product-info">Weight: {item.weight || "N/A"}</p>
              <div className="product-qty">
                <p>Qty:</p>
                <select
                  onChange={(e) =>
                    updateCartQuantity(item._id, Number(e.target.value))
                  }
                  value={cartItems[item._Id]}
                >
                  {Array(5)
                    .fill("")
                    .map((_, i) => (
                      <option key={i} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>
          <p className="cart-price">${item.offerPrice * item.quantity}</p>
          <button
            onClick={() => removeFromCart(item._id)}
            className="remove-btn"
          >
            <FaTrash />
          </button>
        </div>

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
                <p onClick={() => navigate("add-addresses")}>+ Add address</p>
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
            <span>Tax (2%)</span> <span>${(getCartAmount() * 2) / 100}</span>
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
  );
};
