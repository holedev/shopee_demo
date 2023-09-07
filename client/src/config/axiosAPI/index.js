import axios from 'axios';
import cookie from 'react-cookies';

const SERVER_CONTEXT = '/shopee';

export const endpoints = {
  login: `${SERVER_CONTEXT}/api/login/`,
  'current-user': `${SERVER_CONTEXT}/api/current-user/`,
};

export const authApis = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: {
    Authorization: cookie.load('token'),
  },
});

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
