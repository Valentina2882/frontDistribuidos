import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3100/orders/"; // Cambia por la URL real de tu API

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(apiUrl);
  return response.data.orders; // Extrae el arreglo de "orders"
});

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], // Estado inicial
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload; // Asigna directamente el arreglo
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
