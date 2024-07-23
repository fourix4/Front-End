import { STATUS } from '../../config/api';
import { ACCESS_TOKEN } from '../../config/constants';
import { LOGIN_ERROR } from '../../config/error';
import {
  ErrorResponseTypes,
  ResponseTypes,
  UserResponseTypes,
} from '../../types/interfaces';

export const isSuccessDelete = (rawPost: ResponseTypes) => {
  return rawPost.code === STATUS.SUCCESS;
};

export const getUserInfo = (
  rawData: UserResponseTypes | ErrorResponseTypes,
) => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    const result = {
      userName: rawData.data.result.user_name,
      email: rawData.data.result.email,
    };

    return result;
  }

  return { userName: '조현정', email: 'abc123@naver.com' };
  // return { userName: '', email: '' };
};

export const isAuthUser = (
  rawData: ErrorResponseTypes | ResponseTypes,
): { isAuth: boolean; message: string } => {
  if (
    rawData.code === STATUS.UNAUTHORIZED_USER_ERROR ||
    rawData.code === STATUS.SERVER_ERROR
  ) {
    return { isAuth: false, message: LOGIN_ERROR.UNAUTHORIZED_USER_ERROR };
  }

  if (rawData.code === STATUS.REFRESH_TOKEN_EXPIRATION_ERROR) {
    localStorage.removeItem(ACCESS_TOKEN);
    return {
      isAuth: false,
      message: LOGIN_ERROR.REFRESH_TOKEN_EXPIRATION_ERROR,
    };
  }

  return { isAuth: true, message: '' };
};
