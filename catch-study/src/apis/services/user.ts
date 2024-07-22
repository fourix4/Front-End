import { STATUS } from '../../config/api';
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
