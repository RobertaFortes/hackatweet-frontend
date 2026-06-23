import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  signInOpen: false,
  signUpOpen: false,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openSignIn: (state) => {
      state.signInOpen = true;
    },
    closeSignIn: (state) => {
      state.signInOpen = false;
    },
    openSignUp: (state) => {
      state.signUpOpen = true;
    },
    closeSignUp: (state) => {
      state.signUpOpen = false;
    },
  },
});

export const {
  openSignIn,
  closeSignIn,
  openSignUp,
  closeSignUp,
} = modalSlice.actions;

export default modalSlice.reducer;