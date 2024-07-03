import { ResponseTypes } from '../../types/interfaces';
import instance from '../utils/axios';

export const postLogin = async (authCode: string) => {
  try {
    const { data } = await instance.post<ResponseTypes>(
      '/users/login/kakao',
      authCode,
    );
    return data;
  } catch (error) {
    throw error;
  }
};
