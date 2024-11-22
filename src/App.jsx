import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Orders from "./features/orders/Orders";
import Payments from "./features/payments/Payments";
import Products from "./features/products/Products";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-white text-white flex flex-col">
          {/* Navegación */}
          <nav className="bg-indigo-800 text-white p-6 shadow-md rounded-b-xl">
            <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
              MARKETPLACE KZ
            </h1>
            <div className="flex justify-center space-x-6">
              <a
                href="/"
                className="text-lg font-semibold px-5 py-2 rounded-lg transition duration-200 hover:bg-indigo-700"
              >
                Órdenes
              </a>
              <a
                href="/payments"
                className="text-lg font-semibold px-5 py-2 rounded-lg transition duration-200 hover:bg-indigo-700"
              >
                Pagos
              </a>
              <a
                href="/products"
                className="text-lg font-semibold px-5 py-2 rounded-lg transition duration-200 hover:bg-indigo-700"
              >
                Productos
              </a>
            </div>
          </nav>

          {/* Contenido principal */}
          <main className="p-8 flex-grow bg-white">
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </main>

          {/* Pie de página */}
          <footer className="bg-indigo-700 text-white py-4">
            <div className="text-center">
              <p className="text-sm font-semibold">© 2024 MARKETPLACE KZ</p>
              <p className="text-xs mt-2">Hecho con Zare y Kevin ❤️</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
