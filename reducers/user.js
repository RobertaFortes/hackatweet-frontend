import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  username: null,
  token: null,
  password: null,

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.email = action.payload.email;   
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.email = null;
      state.username = null;
      state.token = null;
      state.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;