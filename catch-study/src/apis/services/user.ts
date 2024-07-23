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
      userName: rawData.data.result.userName,
      email: rawData.data.result.email,
      author: rawData.data.result.author,
      userId: rawData.data.result.userId,
    };

    return result;
  }

  return {
    userName: '조현정',
    email: 'abc123@naver.com',
    userId: 1,
    author: 'roleUser',
  };
  // return { userName: '', email: '' };
};
