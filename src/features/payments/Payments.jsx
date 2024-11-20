import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPayments } from "../../redux/slices/paymentsSlice";

const Payments = () => {
  const dispatch = useDispatch();
  const { payments, status, error } = useSelector((state) => state.payments);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPayments()); // Llama al thunk para obtener pagos
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Cargando pagos...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Lista de Pagos</h2>
      <ul>
        {payments.map((payment) => (
          <div key={payment.id} className="bg-white p-4 rounded shadow-lg">
          <p className="font-semibold">ID: <span className="text-blue-500">{payment.id}</span></p>
          <p><strong>Monto:</strong> {payment.amount}</p>
          <p><strong>Método:</strong> {payment.method}</p>
          <p><strong>Estado:</strong> {payment.status}</p>
        </div>
        ))}
      </ul>
    </div>
  );
};

export default Payments;
