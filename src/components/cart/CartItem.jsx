import "./CartItem.css";
import { FaTrash } from "react-icons/fa";

export const CartItem = ({ item, removeFromCart, updateCartQuantity }) => {
  return (
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
            <button
              onClick={() => updateCartQuantity(item._id, item.quantity--)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() => updateCartQuantity(item._id, item.quantity++)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <p className="cart-price">${item.offerPrice * item.quantity}</p>
      <button onClick={() => removeFromCart(item._id)} className="remove-btn">
        <FaTrash />
      </button>
    </div>
  );
};
