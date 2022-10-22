import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CartInitialState, ICartItem } from "../../types";

const initialState: CartInitialState = {
  items: [],
  amount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ICartItem>) => {
      state.items.push(action.payload);
      state.amount++;
    },
    addToCartQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity++;
        state.amount++;
      }
    },
    reduceFromCartQuantity: (state, action: PayloadAction<string>) => {
      const item = state.items.find((item) => item.id === action.payload);
      if (item) {
        item.quantity--;
        state.amount--;
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
        state.amount--;
      }
    },
  },
});

export const {
  addToCart,
  addToCartQuantity,
  reduceFromCartQuantity,
  removeFromCart,
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.cart;

export default cartSlice.reducer;
