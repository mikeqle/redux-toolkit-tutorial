import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "https://course-api.com/react-useReducer-cart-project";

const initialState = {
  cartItems: [],
  amount: 0,
  total: 0,
  isLoading: true,
};

export const getCartItems = createAsyncThunk("cart/getCartItems", async (_, thunkAPI) => {
  try {
    // const response = await fetch(url);
    // const data = await response.json();
    // return data;
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong.")
  }
});

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
      if (state.cartItems === undefined || state.cartItems.length === 0) {
        state.amount = amount;
        state.total = total;
        return;
      }
      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      });
      state.amount = amount;
      state.total = total;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.cartItems = [];
    },
  },
});

// console.log(cartSlice);

export const { clearCart, removeItem, toggleItem, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
