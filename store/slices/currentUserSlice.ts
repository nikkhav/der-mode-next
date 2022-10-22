import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CurrentUserInitialState } from "../../types";

const initialState: CurrentUserInitialState = {
  id: "",
  selectedGender: "women",
  isLogged: false,
};

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    selectGender: (state, action: PayloadAction<string>) => {
      state.selectedGender = action.payload;
    },
  },
});

export const { selectGender } = currentUserSlice.actions;

export const selectCurrentUser = (state: RootState) => state.currentUser;

export default currentUserSlice.reducer;
