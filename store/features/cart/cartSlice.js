import cartItems from "@/cartItems";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
  isLoading: true,
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
});

export default cartSlice.reducer;
