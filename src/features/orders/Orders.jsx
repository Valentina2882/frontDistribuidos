import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchOrders } from "../../redux/slices/ordersSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector((state) => state.orders);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchOrders());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "failed") {
    return <p>Error: {error}</p>;
  }

  if (!Array.isArray(orders) || orders.length === 0) {
    return <p>No orders found.</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Orders</h2>
      <ul className="space-y-2">
        {orders.map((order) => (
          <li
            key={order.id}
            className="p-4 border rounded shadow-sm hover:shadow-md transition"
          >
            <p><strong>ID:</strong> {order.id}</p>
            <p><strong>Total:</strong> ${order.total}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Payment ID:</strong> {order.paymentId}</p>
            <p>
              <strong>Order Items:</strong>{" "}
              {order.orderItems.length > 0
                ? order.orderItems.join(", ")
                : "No items"}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Orders;
