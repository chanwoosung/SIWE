import axios from 'axios';
import { request } from 'https';
import getRefreshTokens from './getRefreshToken';

const client = axios.create({
  baseURL: 'https://goerli-alpha.croffle.me/',
});

client.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    const authType = localStorage.getItem('token_type');
    if (config.headers && token)
      config.headers.Authorization = `${authType} ${token}`;
    return config;
  },
  error => {
    localStorage.clear();
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
    const newTokens = await getRefreshTokens({ refreshToken });
    localStorage.setItem('access_token', newTokens.access_token);
    localStorage.setItem('refresh_token', newTokens.refresh_token);
    localStorage.setItem('expires_in', newTokens.expires_in);
    localStorage.setItem('token_type', newTokens.token_type);
    return Promise.reject(error);
  }
);

export default client;
