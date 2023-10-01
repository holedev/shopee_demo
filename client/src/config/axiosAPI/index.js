import axios from 'axios';
import cookie from 'react-cookies';

const SERVER_CONTEXT = '/shopee';

export const endpoints = {
  login: `${SERVER_CONTEXT}/api/login/`,
  'current-user': `${SERVER_CONTEXT}/api/current-user/`,
  categories: `${SERVER_CONTEXT}/api/categories/`,
  products: `${SERVER_CONTEXT}/api/products/`,
  users: `${SERVER_CONTEXT}/api/users/`,
  comments: `${SERVER_CONTEXT}/api/comments/`,
  pay: `${SERVER_CONTEXT}/api/pay/`,
  stripe: `${SERVER_CONTEXT}/api/stripe/`,
  stats: `${SERVER_CONTEXT}/api/stats/`,
};

export const authApis = () => {
  return axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL,
    headers: {
      Authorization: cookie.load('token'),
    },
  });
};

export const axiosAPI = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
});
