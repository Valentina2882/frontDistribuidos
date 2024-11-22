import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3100/orders/";

export const fetchOrders = createAsyncThunk("orders/fetchOrders", async () => {
  const response = await axios.get(apiUrl); 
  return response.data.orders;  
});

export const addOrder = createAsyncThunk(
  "orders/addOrder", 
  async (newOrder, { rejectWithValue }) => {
    try {
      const response = await axios.post(apiUrl, newOrder); 
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const ordersSlice = createSlice({
  name: "orders", 
  initialState: {
    orders: [], 
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
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(addOrder.rejected, (state, action) => {
        state.status = "failed"; 
        state.error = action.payload || action.error.message;
      });
  },
});

export default ordersSlice.reducer;
