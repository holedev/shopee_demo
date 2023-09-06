import axios from 'axios';
import cookie from 'react-cookies';

const SERVER_CONTEXT = '/shopee';

export const endpoints = {
  login: `${SERVER_CONTEXT}/api/login/`,
};

export const authApis = () => {
  return axios.create({
    baseURL: import.meta.env.SERVER_URL,
    headers: {
      Authorization: cookie.load('token'),
    },
  });
};

export const axiosAPI = axios.create({
  baseURL: 'http://localhost:8081',
});
