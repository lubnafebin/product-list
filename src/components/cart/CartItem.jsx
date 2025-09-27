import "./CartItem.css";
import { FaTrash } from "react-icons/fa";

export const CartItem = ({ item, removeFromCart }) => {
  // const [showAddress, setShowAddress] = useState(false);
  return (
    <div className="cart-container">
      {/* Left Side - Cart Items */}
      <div className="cart-items">
        <h1 className="cart-title">
          Review Cart <span className="cart-subtitle">3 Items</span>
        </h1>

        <div className="cart-header">
          <p>Product Details</p>
          <p>Subtotal</p>
          <p>Action</p>
        </div>

        <div className="cart-row">
          <div className="cart-product">
            <div className="cart-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div>
              <p className="product-name">{item.name}</p>
              <p className="product-info">Size: {item.size || "N/A"}</p>
              <div className="product-qty">
                <p>Qty:</p>
                <select>
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
            onClick={() => removeFromCart(item.id)}
            className="remove-btn"
          >
            <FaTrash />
          </button>
        </div>

        <button className="continue-btn">← Continue Shopping</button>
      </div>

      {/* Right Side - Order Summary */}
      <div className="order-summary">
        <h2>Order Summary</h2>
        <hr />

        <div className="summary-section">
          <p className="section-title">Delivery Address</p>
          <div className="address-box">
            <p>No address found</p>
            <button
              // onClick={() => setShowAddress(!showAddress)}
              className="link-btn"
            >
              Change
            </button>
            {/* {showAddress && (
              <div className="address-dropdown">
                <p onClick={() => setShowAddress(false)}>New York, USA</p>
                <p onClick={() => setShowAddress(false)}>+ Add address</p>
              </div>
            )} */}
          </div>

          <p className="section-title">Payment Method</p>
          <select>
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr />

        <div className="price-summary">
          <p>
            <span>Price</span> <span>$20</span>
          </p>
          <p>
            <span>Shipping Fee</span> <span className="green">Free</span>
          </p>
          <p>
            <span>Tax (2%)</span> <span>$20</span>
          </p>
          <p className="total">
            <span>Total Amount:</span> <span>$20</span>
          </p>
        </div>
        <button className="place-order-btn">Place Order</button>
      </div>
    </div>
  );
};
