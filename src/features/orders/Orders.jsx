import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/ordersSlice";
import axios from "axios";

const Orders = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(null);
  const dispatch = useDispatch();
  const { orders, error } = useSelector((state) => state.orders);

  const handleLoadOrders = () => {
    setIsLoading(true);
    dispatch(fetchOrders())
      .finally(() => setIsLoading(false));
  };

  const handleCancelOrder = async (orderId) => {
    setIsDeleting(orderId); 
    try {
      await axios.put(`http://localhost:3100/orders/cancel/${orderId}`);
      dispatch(fetchOrders());
    } catch (error) {
      console.error("Error al cancelar la orden:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-100 to-teal-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-11/12 sm:w-3/4 lg:w-2/3">
        <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Orders
        </h1>

        {/* Botón de cargar órdenes */}
        <div className="text-center mb-8">
          <button
            onClick={handleLoadOrders}
            disabled={isLoading}
            className={`px-6 py-3 bg-teal-500 rounded-lg text-white font-semibold transition duration-300 ease-in-out transform focus:outline-none ${
              isLoading
            }`}
          >
            {isLoading ? "Loading..." : "Load Orders"}
          </button>
        </div>

        {/* Mensaje de error */}
        {error && (
          <div className="text-center text-red-500 font-medium mb-4">
            Error: {error}
          </div>
        )}

        {/* Mensaje cuando no hay órdenes */}
        {orders.length === 0 && !isLoading && (
          <div className="text-center text-gray-600 italic">
            No orders found. Please load them.
          </div>
        )}

        {/* Lista de órdenes */}
        {orders.length > 0 && (
          <ul className="divide-y divide-gray-200">
            {orders.map((order) => (
              <li
                key={order.id}
                className="py-6 px-6 flex flex-col sm:flex-row sm:justify-between bg-gray-50 hover:bg-gray-100 rounded-xl mb-4 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div>
                  <p className="font-semibold text-lg text-gray-800">
                    <strong>Order ID:</strong> {order.id}
                  </p>
                  <p className="text-gray-700 mt-1">
                    <strong>Total:</strong> ${order.total.toFixed(2)}
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <p
                    className={`font-medium text-lg ${
                      order.status === "Completed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    <strong>Status:</strong> {order.status}
                  </p>
                </div>

                {/* Botón para cancelar la orden */}
                <div className="mt-4 sm:mt-0 sm:text-right">
                  <button
                    onClick={() => handleCancelOrder(order.id)}
                    disabled={isDeleting === order.id}
                    className={`px-4 py-2 rounded-md transition duration-300 ${
                      isDeleting === order.id
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 hover:bg-red-600"
                    } text-white`}
                  >
                    {isDeleting === order.id ? "Cancelling..." : "Cancel"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Orders;
