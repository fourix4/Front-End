import { STATUS } from '../../config/api';
import { ResponseTypes } from '../../types/interfaces';

const isSuccessDelete = (rawPost: ResponseTypes) => {
  return rawPost.code === STATUS.SUCCESS;
};

export default isSuccessDelete;
