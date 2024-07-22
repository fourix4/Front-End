import {
  ErrorResponseTypes,
  LoginResponseTypes,
  ResponseTypes,
  UserResponseTypes,
} from './../../types/interfaces';
import instance from '../utils/axios';
import { API_ADDRESS } from '../../config/api';

export const postLogin = async () => {
  try {
    const { data } = await instance.post<LoginResponseTypes>(
      API_ADDRESS.KAKAO_LOGIN_URI,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const postLogout = async () => {
  try {
    const { data } = await instance.post<ResponseTypes>(API_ADDRESS.LOGOUT_URI);

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const deleteUser = async () => {
  try {
    const { data } = await instance.delete<ResponseTypes>(API_ADDRESS.USER);

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getUser = async () => {
  try {
    const { data } = await instance.get<UserResponseTypes>(API_ADDRESS.USER);

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
