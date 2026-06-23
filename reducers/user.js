import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstname: null,
  username: null,
  token: null,
  password: null,

};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.firstname = action.payload.firstname;   
      state.username = action.payload.username;
      state.password = action.payload.password;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.firstname = null;
      state.username = null;
      state.token = null;
      vstate.password = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;