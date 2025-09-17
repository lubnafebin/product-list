import "./CartPage.css"
import { useState } from "react";
import { CartItem } from "../components/cart/CartItem";

export const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "Carrot (1kg)",
      price: 40,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1639086495429-d60e72c53c81?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGNhcnJvdHN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: 2,
      title: "Potato (1kg)",
      price: 30,
      quantity: 1,
      image: "https://plus.unsplash.com/premium_photo-1702403157830-9df749dc6c1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnJvY2NvbGl8ZW58MHx8MHx8fDA%3D",
    },
  ]);
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
