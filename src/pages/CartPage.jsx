import "./CartPage.css";
import toast from "react-hot-toast";
import { CartItem } from "../components/cart/CartItem";
import { useAppContext } from "../context/AppContext";
import { useEffect, useState } from "react";

export const CartPage = () => {
  const [cartArray, setCartArray] = useState([]);
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
    products,
  } = useAppContext();

  const getCart = () => {
    let tempArray = [];
    for (const key in cartItems) {
      const product = products.find((item) => item._id === key);
      product.quantity = cartItems[key];
      tempArray.push(product);
    }
    setCartArray(tempArray);
  };

  const placeOrder = async () => {
    try {
      if (!selectedAddress) {
        return toast.error("Please select an address");
      }
      const hasOutOfStock = cartArray.some((item) => !item.inStock);
      if (hasOutOfStock) {
        return toast.error(
          "Remove out-of-stock items before placing the order"
        );
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else {
          toast.error(data.message);
        }
      } else {
        //payment using stripe
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectedAddress._id,
        });

        if (data.success) {
          window.location.replace(data.url);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //update cart quantity
  const updateCartQuantity = (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("cart updated");
  };

  // Remove item
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`/api/cart/remove/${id}`);
      setCartItems((prev) => {
        const updatedCart = { ...prev };
        delete updatedCart[id];
        return updatedCart;
      });
      toast.success("Removed from Cart");
    } catch (error) {
      toast.error(error.message);
    }
  };

  //address api integration
  const getUserAddress = async () => {
    try {
      const { data } = await axios.get("/api/address/get");
      if (data.success) {
        setAddresses(data.addresses);
        if (data.addresses.length > 0) {
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
    if (products.length > 0 && cartItems) {
      getCart();
    }
  }, [products, cartItems]);

  useEffect(() => {
    if (user) {
      getUserAddress();
    }
  }, [user]);

  return (
    <div className="cart-page">
      {products?.length === 0 && !cartItems ? (
        <p className="cart-empty">Your Cart is Empty</p>
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
            {cartArray.map((item) => (
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
