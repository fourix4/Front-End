import { ResponseTypes } from '../../types/interfaces';

const isSuccessLogin = (rawPost: ResponseTypes) => {
  if (rawPost.code >= 200 && rawPost.code < 300) {
    return true;
  }

  return false;
};

export default isSuccessLogin;
