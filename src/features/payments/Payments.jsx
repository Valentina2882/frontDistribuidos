import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayments } from "../../redux/slices/paymentsSlice";
import axios from "axios";

const Payments = () => {
  const dispatch = useDispatch();
  const { payments, status, error } = useSelector((state) => state.payments);
  
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPayments()); 
    }
  }, [dispatch, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || !method) {
      setMessage("Por favor, complete todos los campos.");
      return;
    }

    setLoading(true); 

    try {
      const response = await axios.post("http://localhost:3200/payments/process", {
        amount: parseFloat(amount), 
        method,
      });

      setMessage("Pago agregado exitosamente.");
      setAmount(""); 
      setMethod(""); 
      dispatch(fetchPayments());
    } catch (error) {
      setMessage("Error al agregar el pago");
    } finally {
      setLoading(false); 
    }
  };

  if (status === "loading") return <p className="text-center text-lg font-semibold text-black">Cargando pagos...</p>;
  if (status === "failed") return <p className="text-center text-lg font-semibold text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-teal-100 flex flex-col items-center py-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-11/12 sm:w-3/4 lg:w-2/3">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">Lista de Pagos</h2>

        {/* Mensaje de estado */}
        {message && (
          <p className="text-center text-lg font-semibold text-green-600">
            {message}
          </p>
        )}

        {/* Formulario para agregar pago */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <label htmlFor="amount" className="block text-lg font-medium text-black">
              Monto:
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value) || "")}
              className="w-full p-2 border rounded-md text-black bg-white"
              required
            />
          </div>
          <div>
            <label htmlFor="method" className="block text-lg font-medium text-black">
              Método de Pago:
            </label>
            <input
              type="text"
              id="method"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              className="w-full p-2 border rounded-md text-black bg-white"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-teal-500 text-white font-bold rounded-md"
            disabled={loading}
          >
            {loading ? "Procesando..." : "Agregar Pago"}
          </button>
        </form>

        {/* Mensaje cuando no hay pagos */}
        {payments.length === 0 && (
          <div className="text-center text-black italic mb-6">
            No se encontraron pagos.
          </div>
        )}

        {/* Lista de pagos */}
        {payments.length > 0 && (
          <ul className="space-y-4">
            {payments.map((payment) => (
              <li
                key={payment.id}
                className="p-6 bg-white rounded-lg hover:shadow-xl bg-gray-50 hover:bg-gray-100 shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-lg text-black">
                      <strong>ID:</strong> <span className="text-blue-500">{payment.id}</span>
                    </p>
                    <p className="text-black mt-2">
                      <strong>Monto:</strong> ${payment.amount.toFixed(2)}
                    </p>
                    <p className="text-black mt-2">
                      <strong>Método:</strong> {payment.method}
                    </p>
                  </div>

                  <div className="text-right">
                    <p
                      className={`font-medium text-lg ${payment.status === "Completed" ? "text-green-600" : "text-yellow-600"}`}
                    >
                      <strong>Estado:</strong> {payment.status}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Payments;
