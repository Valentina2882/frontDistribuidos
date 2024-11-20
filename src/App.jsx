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
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-500 text-white p-4">
            <h1 className="text-xl">Dashboard</h1>
            <ul>
              <li><a href="/">Órdenes</a></li>
              <li><a href="/payments">Pagos</a></li>
              <li><a href="/products">Productos</a></li>
            </ul>
          </nav>
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Orders />} />
              <Route path="/payments" element={<Payments />}/>
              <Route path="/products" element={<Products />}/>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
