import { LoginResponseTypes, ResponseTypes } from '../../types/interfaces';

const isSuccessLogin = (rawPost: LoginResponseTypes | ResponseTypes) => {
  if (rawPost.code >= 200 && rawPost.code < 300) {
    localStorage.setItem('accessToken', `${rawPost.data!.accessToken}`);
    return true;
  }

  return false;
};

export default isSuccessLogin;
