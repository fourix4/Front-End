import { LoginResponseTypes, ResponseTypes } from './../../types/interfaces';
import instance from '../utils/axios';

const postLogin = async (authCode: string) => {
  try {
    const { data } = await instance.post<LoginResponseTypes | ResponseTypes>(
      '/users/login/kakao',
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
