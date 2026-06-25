import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
  password: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.username = null;
      state.token = null;
      state.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;