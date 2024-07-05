import { LoginResponseTypes, ResponseTypes } from './../../types/interfaces';
import instance from '../utils/axios';
import { API_ADDRESS } from '../../config/api';

const postLogin = async (authCode: string) => {
  try {
    const { data } = await instance.post<LoginResponseTypes | ResponseTypes>(
      API_ADDRESS.KAKAO_LOGIN_URI,
      {
        code: authCode,
      },
    );

    return data;
  } catch (error) {
    return { code: 400, message: 'Server Error' };
  }
};

export default postLogin;
