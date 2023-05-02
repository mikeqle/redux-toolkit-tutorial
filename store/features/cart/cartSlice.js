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
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },
    toggleItem: (state, { payload }) => {
      const toggle = payload.toggle;
      const cartItem = state.cartItems.find((item) => item.id === payload.id);
      if (toggle === "increase") {
        cartItem.amount += 1;
      } else if (toggle === "decrease") {
        cartItem.amount -= 1;
      } else {
        cartItem.amount = 0;
      }
    },
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggleItem, calculateTotals } = cartSlice.actions;

export default cartSlice.reducer;
