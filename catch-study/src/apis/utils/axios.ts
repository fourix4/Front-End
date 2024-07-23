import axios, { AxiosError } from 'axios';
import { API_ADDRESS, STATUS } from '../../config/api';
import { ACCESS_TOKEN } from '../../config/constants';
import { ErrorResponseTypes, LoginResponseTypes } from '../../types/interfaces';

const instance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    withCredentials: true,
  },
});

const onError = (code: number, message: string) => {
  const error = { code, message };

  throw error;
};

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

    const { accessToken } = response.data.data.result;

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
    if (axios.isAxiosError<ErrorResponseTypes>(error) && error.response) {
      const { code, message } = error.response.data;
      const status = +code;

      switch (status) {
        case STATUS.IMAGE_ERROR:
          onError(status, message);
          break;
        case STATUS.ACCESS_TOKEN_EXPIRATION_ERROR:
          if (error.config) {
            try {
              const newAccessToken = await refreshAccessToken();

              error.config.headers.Authorization = `Bearer ${newAccessToken}`;

              return instance(error.config);
            } catch (refreshError) {
              if (
                axios.isAxiosError<ErrorResponseTypes>(refreshError) &&
                error.response
              ) {
                onError(+error.response.data.code, error.response.data.message);
              }
            }
          }
          break;
        case STATUS.REFRESH_TOKEN_EXPIRATION_ERROR:
          onError(status, message);
          break;
        case STATUS.UNAUTHORIZED_USER_ERROR:
          onError(status, message);
          break;
        case STATUS.METHOD_NOT_ALLOWED_ERROR:
          onError(status, message);
          break;
        case STATUS.BOOKING_ERROR:
          onError(status, message);
          break;
        case STATUS.SERVER_ERROR:
          onError(status, '서버 에러');
          break;
        default:
          onError(status, error.message);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
