import { configureStore } from '@reduxjs/toolkit';
import ordersReducer from './slices/ordersSlice';
import paymentsReducer from './slices/paymentsSlice';

const store = configureStore({
  reducer: {
    orders: ordersReducer,
    payments: paymentsReducer,
  },
});

export default store;
