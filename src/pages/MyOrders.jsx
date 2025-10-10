import { useEffect, useState } from "react";
import "./MyOrders.css";
import { useAppContext } from "../context/AppContext";

export const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/order/user");
      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="my-orders">
      <div className="order-container">
        <p className="order-title">My Orders</p>

        {myOrders.map((order, index) => (
          <div key={index} className="order">
            <div className="order-info">
              <span>OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: ${order.amount}</span>
            </div>

            {order.items.map((item, idx) => (
              <div key={idx} className="order-item">
                <div className="order-item-left">
                  <div className="order-item-image">
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className="order-item-details">
                    <h2>{item.product.name}</h2>
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>

                <div className="order-payment-details">
                  <span>Quantity: {item.quantity}</span>
                  <span>Status: {order.status}</span>
                  <span>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="order-amount">
                  Amount:${item.product.offerPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
