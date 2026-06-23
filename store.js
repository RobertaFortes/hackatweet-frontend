import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';
import modal from './reducers/modal';

export default configureStore({
  reducer: {
    user,
    modal,
  },
});