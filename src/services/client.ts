import axios from 'axios';
import { useAppDispatch } from '../store/config';
import { setLogin } from '../store/slices/tokenSlice';
import getRefreshTokens from './getRefreshToken';

const client = axios.create({
  baseURL: 'https://api.goerli-alpha.croffle.me/',
});

client.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    const authType = localStorage.getItem('token_type');
    if (config.headers && token)
      config.headers.Authorization = `${authType} ${token}`;
    return config;
  },
  async error => {
    const refreshToken = localStorage.getItem('refresh_token');
    if ((typeof error === 'string' && error === 'No Token') || !refreshToken) {
      localStorage.clear();
      return Promise.reject(error);
    }
    await getRefreshTokens({ refreshToken });
    
    return Promise.reject(error);
  }
);

client.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const refreshToken = localStorage.getItem('refresh_token');
    if ((typeof error === 'string' && error === 'No Token') || !refreshToken) {
      localStorage.clear();
      return Promise.reject(error);
    }
    await getRefreshTokens({ refreshToken });
    return Promise.reject(error);
  }
);

export default client;
