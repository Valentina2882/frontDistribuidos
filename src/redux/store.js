import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import paymentsReducer from './slices/paymentsSlice';
import productsReducer from './slices/productsSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    payments: paymentsReducer,
    products: productsReducer,
  },
});

export default store;
