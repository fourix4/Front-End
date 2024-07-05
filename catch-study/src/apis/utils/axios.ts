import axios, { AxiosError } from 'axios';
import { SERVER_URL } from '../../config/constants';
import { LoginResponseTypes } from '../../types/interfaces';

const instance = axios.create({
  baseURL: `${SERVER_URL}api`,
  headers: {
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

const refreshAccessToken = async () => {
  try {
    const response = await instance.post<LoginResponseTypes>(
      '/users/reissuance',
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
        withCredentials: true,
      },
    );

    const { accessToken } = response.data.data;

    localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (!error.config || !error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    try {
      const newAccessToken = await refreshAccessToken();

      error.config.headers.Authorization = `Bearer ${newAccessToken}`;

      return instance(error.config);
    } catch (refreshError) {
      console.log(refreshError);
      return Promise.reject(refreshError);
    }
  },
);

export default instance;
