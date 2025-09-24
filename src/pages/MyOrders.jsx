import { useEffect, useState } from "react";
import "./MyOrders.css";

export const MyOrders = () => {
  // dummy orders array
  const dummyOrders = [
    {
      _id: "ORD001",
      paymentType: "Online",
      amount: 1200,
      status: "Delivered",
      createdAt: "2025-09-15T10:30:00Z",
      item: [
        {
          quantity: 2,
          product: {
            name: "Fresh Spinach",
            category: "Leafy Green",
            images: [
              "https://images.unsplash.com/photo-1651427660796-1bc57aafa229?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3BpbmFjaHxlbnwwfHwwfHx8MA%3D%3D",
            ],
            offerPrice: 100,
          },
        },
        {
          quantity: 1,
          product: {
            name: "Tomatoes",
            category: "Vegetable",
            images: [
              "https://images.unsplash.com/photo-1571680322279-a226e6a4cc2a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8dG9tYXRvfGVufDB8fDB8fHww",
            ],
            offerPrice: 50,
          },
        },
      ],
    },
    {
      _id: "ORD002",
      paymentType: "COD",
      amount: 600,
      status: "Pending",
      createdAt: "2025-09-18T14:20:00Z",
      item: [
        {
          quantity: 3,
          product: {
            name: "Cabbage",
            category: "Vegetable",
            images: [
              "https://images.unsplash.com/photo-1591586007768-40725cc562a1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FiYmFnZXxlbnwwfHwwfHx8MA%3D%3D",
            ],
            offerPrice: 200,
          },
        },
      ],
    },
  ];

  const [myOrders, setMyOrders] = useState([]);

  useEffect(() => {
    setMyOrders(dummyOrders);
  }, []);

  return (
    <div className="my-orders">
      <div className="container">
        <p className="title">My Orders</p>

        {myOrders.map((order, index) => (
          <div key={index} className="order">
            <div className="order-info">
              <span>OrderId: {order._id}</span>
              <span>Payment: {order.paymentType}</span>
              <span>Total Amount: ₹{order.amount}</span>
            </div>

            {order.item.map((item, idx) => (
              <div key={idx} className="order-item">
                <div className="item-left">
                  <div className="item-image">
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>
                  <div className="item-details">
                    <h2>{item.product.name}</h2>
                    <p>Category: {item.product.category}</p>
                  </div>
                </div>

                <div className="payment-details">
                  <span>Quantity: {item.quantity}</span>
                  <span>Status: {order.status}</span>
                  <span>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="amount">
                  Amount:₹{item.product.offerPrice * item.quantity}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
