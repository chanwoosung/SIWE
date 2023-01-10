import axios from 'axios';
import getRefreshTokens from './getRefreshToken';

const client = axios.create({
  baseURL: process.env.REACT_APP_API_SERVER,
});

client.interceptors.request.use(
  async config => {
    const currentTimestamp = new Date().getTime();
    if (Number(localStorage.getItem('expires_in')) - currentTimestamp < 30000) {
      const refreshToken = localStorage.getItem('refresh_token');

      refreshToken &&
        (await getRefreshTokens({ refreshToken }).then(resp => {
          const { access_token, refresh_token, expires_in } = resp.data;
          const currentTimestamp = new Date().getTime();
          const refreshTokenExpiresAt =
            currentTimestamp + Number(expires_in * 1000);
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          localStorage.setItem('expires_in', refreshTokenExpiresAt.toString());
        }));
    }
    const token = localStorage.getItem('access_token');
    if (config.headers && token)
      config.headers.Authorization = `Bearer ${token}`;
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
        localStorage.setItem('expires_in', refreshTokenExpiresAt.toString());
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
