import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import productSlice from "./Slices/productSlice";
import cartSlice from "./Slices/cartSlice"
import checkoutSlice from "./Slices/checkoutSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    cart : cartSlice,
    checkout:checkoutSlice,
  },
});
export default store;
