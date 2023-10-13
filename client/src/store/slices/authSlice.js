import {createSlice} from '@reduxjs/toolkit';
import {getTokenFromLocalStorage, removeTokenFromLocalStorage, setTokenToLocalStorage} from '../../utils.js';

const initialState = {
  isAuthenticated: !!getTokenFromLocalStorage(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      setTokenToLocalStorage(action.payload.token);
    },
    checkIsAuthorized(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      removeTokenFromLocalStorage();
    },
  },
});

export const {loginSuccess, logout, checkIsAuthorized} = authSlice.actions;
export default authSlice.reducer;
