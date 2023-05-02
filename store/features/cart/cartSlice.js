import cartItems from "@/cartItems";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: cartItems,
  amount: 4,
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
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggleItem } = cartSlice.actions;

export default cartSlice.reducer;
