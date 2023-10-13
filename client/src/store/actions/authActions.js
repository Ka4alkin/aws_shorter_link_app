import {checkIsAuthorized, loginSuccess, logout} from '../slices/authSlice';
import axiosInstance from '../../axiosInstance.js';
import {alertErr, alertSuccess} from '../../utils.js';

export const login = (userData) => async (dispatch) => {
  await axiosInstance.post('/loginUser', userData)
      .then((response) => {
        const {token, ...user} = response.data;
        dispatch(loginSuccess({token, user}));
        alertSuccess('Login successfully');
      })
      .catch((error) => {
        alertErr(error);
      });
};

export const getUserByEmail = (email) => async (dispatch) => {
  await axiosInstance.post('/getUserByEmail', {email})
      .then((response) => {
        const {token, ...user} = response.data;
        dispatch(checkIsAuthorized({token, user}));
      })
      .catch((error) => {
        dispatch(logout());
        alertErr(error);
      });
};

