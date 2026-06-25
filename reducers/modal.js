import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // null = fechado, 'signin' ou 'signup' = aberto no respectivo modo
  authMode: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAuth: (state, action) => {
      // action.payload: 'signin' | 'signup'
      state.authMode = action.payload;
    },
    closeAuth: (state) => {
      state.authMode = null;
    },
  },
});

export const { openAuth, closeAuth } = modalSlice.actions;

export default modalSlice.reducer;
