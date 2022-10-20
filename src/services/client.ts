import axios from 'axios';

export const client = axios.create({
  baseURL: 'https://goerli-alpha.croffle.me/',
});
