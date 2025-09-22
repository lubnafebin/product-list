import "./CartPage.css";
import { CartItem } from "../components/cart/CartItem";
import { useAppContext } from "../context/AppContext";

export const CartPage = () => {
  const { cartItems, setCartItems } = useAppContext();
  // Update quantity
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
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return (
    <div className="cart-page">
      <h2>Review Your Order</h2>
      {cartItems.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
            />
          ))}
          <div className="cart-summary">
            <h3>Total: ₹{total.toFixed(2)}</h3>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};
