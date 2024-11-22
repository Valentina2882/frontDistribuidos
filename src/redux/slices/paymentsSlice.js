import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3200/payments/"; 

export const fetchPayments = createAsyncThunk("payments/fetchPayments", async () => {
  const response = await axios.get(apiUrl);
  return response.data.payments; 
});

export const addPayment = createAsyncThunk("payments/addPayment", async (newPayment) => {
  const response = await axios.post(apiUrl, newPayment);
  return response.data.payment; 
});

const paymentsSlice = createSlice({
  name: "payments",
  initialState: {
    payments: [],
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
        state.payments = action.payload; 
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });

    builder
      .addCase(addPayment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.payments.push(action.payload); 
      })
      .addCase(addPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default paymentsSlice.reducer;
