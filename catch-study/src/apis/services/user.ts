import { STATUS } from '../../config/api';
import { ACCESS_TOKEN } from '../../config/constants';
import { LoginResponseTypes, ResponseTypes } from '../../types/interfaces';

const isSuccessLogin = (rawPost: LoginResponseTypes | ResponseTypes) => {
  if (rawPost.code >= STATUS.SUCCESS && rawPost.code < STATUS.REDIRECTION) {
    localStorage.setItem(ACCESS_TOKEN, `${rawPost.data!.result.accessToken}`);
    return true;
  }

  return false;
};

export default isSuccessLogin;
