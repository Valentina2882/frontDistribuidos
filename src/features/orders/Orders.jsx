import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/ordersSlice";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false); // Para manejar el estado de carga
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);

  // Función que se llama al hacer clic en el botón
  const handleLoadOrders = () => {
    setIsLoading(true); // Marca como cargando
    dispatch(fetchOrders()) // Llama a la acción que hace el GET
      .finally(() => setIsLoading(false)); // Termina el estado de carga
  };

  return (
    <div>
      <h1>Orders</h1>
      <button onClick={handleLoadOrders} disabled={isLoading}>
        {isLoading ? "Loading..." : "Load Orders"}
      </button>

      {error && <div>Error: {error}</div>}

      {/* Mostrar mensaje si no hay órdenes */}
      {orders.length === 0 && !isLoading && (
        <div>No orders found. Please load them.</div>
      )}

      {/* Mostrar las órdenes si las hay */}
      {orders.length > 0 && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              <p><strong>Order ID:</strong> {order.id}</p>
              <p><strong>Total:</strong> {order.total}</p>
              <p><strong>Status:</strong> {order.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Orders;
