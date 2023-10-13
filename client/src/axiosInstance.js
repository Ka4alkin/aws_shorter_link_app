import axios from 'axios';
import {getTokenFromLocalStorage} from './utils.js';

const instance = axios.create({
  baseURL: import.meta.env.VITE_REST_API_GATEWAY,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${getTokenFromLocalStorage()}`,
  },
});

export default instance;
