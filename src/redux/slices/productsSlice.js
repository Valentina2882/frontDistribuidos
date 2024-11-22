import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const apiUrl = "http://localhost:3300/products/";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get(apiUrl);
  return response.data.products;
});

export const fetchProductsByIds = createAsyncThunk("products/fetchProductsByIds", async (productIds) => {
  const response = await axios.post(`${apiUrl}getByIds`, { productIds });
  return response.data.products;
});

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductsByIds.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIds.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProductsByIds.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
