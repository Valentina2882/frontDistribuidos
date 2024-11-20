import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3200/payments/"; // Cambia por la URL real de tu API

// AsyncThunk para obtener pagos
export const fetchPayments = createAsyncThunk("payments/fetchPayments", async () => {
  const response = await axios.get(apiUrl);
  return response.data.payments; // Extrae el arreglo de "payments"
});

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [], // Estado inicial
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPayments.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments = action.payload; // Asigna directamente el arreglo
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default paymentsSlice.reducer;
