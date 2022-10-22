import { configureStore } from "@reduxjs/toolkit";
import { currentUserSlice } from "./slices/currentUserSlice";
import { cartSlice } from "./slices/cartSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserSlice.reducer,
    cart: cartSlice.reducer,
  },
});

// Language: typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
