import { useEffect, useState } from "react";
import "./Orders.css";
export const Orders = () => {
  const boxIcon =
    "https://imgs.search.brave.com/7uQUsmhSVLBcJYkr0GT1VhBA4z8UklnpIiVmQxYuod0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni8xMzM4Ni8xMzM4/NjI5MC5wbmc_c2Vt/dD1haXNfd2hpdGVf/bGFiZWw";

  const dummyOrders = [
    {
      id: 1,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 1 }],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 320.0,
      paymentType: "Credit Card",
      isPaid: true,
    },
    {
      id: 2,
      items: [{ product: { name: "Nike Air Max 270" }, quantity: 2 }],
      address: {
        firstName: "Alice",
        lastName: "Smith",
        street: "456 Market St",
        city: "Chicago",
        state: "IL",
        zipcode: "60601",
        country: "USA",
      },
      amount: 640.0,
      paymentType: "PayPal",
      isPaid: false,
    },
  ];

  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    setOrders(dummyOrders);
  };

  useEffect(() => {
    fetchOrders();
  }, []);
  return (
    <div className="orders-container">
      <h2 className="orders-title">Orders List</h2>
      {orders.map((order, index) => (
        <div key={index} className="orders-card">
          {/* Product */}
          <div className="orders-item">
            <img className="orders-icon" src={boxIcon} alt="boxIcon" />
            <div>
              {order.items.map((item, idx) => (
                <p key={idx} className="orders-product">
                  {item.product.name}{" "}
                  <span
                    className={`orders-quantity ${
                      item.quantity < 2 ? "hidden" : ""
                    }`}
                  >
                    x {item.quantity}
                  </span>
                </p>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="orders-address">
            <p className="orders-name">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          {/* Amount */}
          <p className="orders-amount">${order.amount}</p>

          {/* Payment Info */}
          <div className="orders-info">
            <span>Method: {order.paymentType}</span>
            <span>Date: {new Date(order.createdAt).toLocaleDateString()}</span>
            <span>Payment: {order.isPaid ? "Paid" : "Pending"}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
