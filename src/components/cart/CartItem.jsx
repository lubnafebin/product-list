import "./CartItem.css"
import { FaTrash } from "react-icons/fa";

export const CartItem = ({ item, removeFromCart, updateCartQuantity }) => {
  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <img src={item.images[0]} alt={item.title} className="cart-item-img" />
        <div>
          <h3 className="cart-item-title">{item.title}</h3>
          <p className="cart-item-price">{item.price}</p>
        </div>

        <div className="cart-item-qty">
          <button
            onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="cart-item-actions">
          <p className="cart-item-total">
            ₹{(item.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            className="remove-btn"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};
