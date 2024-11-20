import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Orders from "./features/orders/Orders";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <nav className="bg-blue-500 text-white p-4">
            <h1 className="text-xl">Orders Dashboard</h1>
          </nav>
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Orders />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
