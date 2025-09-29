import "./CartItem.css";
import { FaTrash } from "react-icons/fa";
import { useAppContext } from "../../context/AppContext";

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

  const { cartItems } = useAppContext();

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
      <button onClick={() => removeFromCart(item._id)} className="remove-btn">
        <FaTrash />
      </button>
    </div>
  );
};
