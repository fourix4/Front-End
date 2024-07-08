import axios, { AxiosError } from 'axios';
import { ACCESS_TOKEN, SERVER_URL } from '../../config/constants';
import { LoginResponseTypes } from '../../types/interfaces';
import { API_ADDRESS, STATUS } from '../../config/api';

const instance = axios.create({
  baseURL: `${SERVER_URL}`,
  headers: {
    withCredentials: true,
  },
});

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN);

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
      API_ADDRESS.REISSUANCE_URI,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
        withCredentials: true,
      },
    );

    const { accessToken } = response.data.data;

    localStorage.setItem(ACCESS_TOKEN, accessToken);

    return accessToken;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    if (
      !error.config ||
      !error.response ||
      error.response.status !== STATUS.ACCESS_TOKEN_EXPIRATION_ERROR
    ) {
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
