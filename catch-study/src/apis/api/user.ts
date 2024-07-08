import { LoginResponseTypes, ResponseTypes } from './../../types/interfaces';
import instance from '../utils/axios';
import { API_ADDRESS, STATUS } from '../../config/api';

export const postLogin = async (authCode: string) => {
  try {
    const { data } = await instance.post<LoginResponseTypes | ResponseTypes>(
      API_ADDRESS.KAKAO_LOGIN_URI,
      {
        code: authCode,
      },
    );

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export const postLogout = async () => {
  try {
    const { data } = await instance.post<ResponseTypes>(API_ADDRESS.LOGOUT_URI);

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};
