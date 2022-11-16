import axios from 'axios';
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
    getRefreshTokens({ refreshToken })
      .then(resp => {
        const { access_token, refresh_token, expires_in } = resp.data;
        const currentTimestamp = new Date().getTime();
        const refreshTokenExpiresAt =
          currentTimestamp + Number(expires_in * 1000);
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        localStorage.setItem(
          'refreshTokenExpiresAt',
          refreshTokenExpiresAt.toString()
        );
        return client({
          ...error.config,
          headers: {
            ...error.config.headers,
            authorization: `Bearer ${access_token as string}`,
          },
        });
      })
      .catch(error => {
        localStorage.clear();
        return Promise.reject(error);
      })
      .finally(() => {
        window.location.reload();
      });

    return Promise.reject(error);
  }
);

export default client;
