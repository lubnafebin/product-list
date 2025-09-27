import "./CartPage.css";
import toast from "react-hot-toast";
import { CartItem } from "../components/cart/CartItem";
import { useAppContext } from "../context/AppContext";
import { FaCheckCircle } from "react-icons/fa";

export const CartPage = () => {
  const { setCartItems } = useAppContext();
  // // Update quantity
  // const updateCartQuantity = (id, newQty) => {
  //   setCartItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: newQty } : item
  //     )
  //   );
  // };
  const cartItems = [
    {
      _id: 1,
      name: "Running Shoes",
      description: [
        "Lightweight and comfortable",
        "Breathable mesh upper",
        "Ideal for jogging and casual wear",
      ],
      offerPrice: 250,
      price: 200,
      quantity: 1,
      size: 42,
      image:
        "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      category: "Footwear",
    },
    // {
    //   name: "Running Shoes",
    //   description: [
    //     "Lightweight and comfortable",
    //     "Breathable mesh upper",
    //     "Ideal for jogging and casual wear",
    //   ],
    //   offerPrice: 250,
    //   price: 200,
    //   quantity: 1,
    //   size: 42,
    //   image:
    //     "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
    //   category: "Footwear",
    // },
    // {
    //   name: "Running Shoes",
    //   description: [
    //     "Lightweight and comfortable",
    //     "Breathable mesh upper",
    //     "Ideal for jogging and casual wear",
    //   ],
    //   offerPrice: 250,
    //   price: 200,
    //   quantity: 1,
    //   size: 42,
    //   image:
    //     "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
    //   category: "Footwear",
    // },
  ];
  // Remove item
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from Cart", {
      icon: <FaCheckCircle className="text-green-500" />,
    });
  };

  return (
    <div className="cart-page">
      {cartItems.length === 0 ? (
        <p>Your Cart is Empty</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
            />
          ))}
        </>
      )}
    </div>
  );
};
