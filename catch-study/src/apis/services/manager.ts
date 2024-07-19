import { STATUS } from '../../config/api';
import { ResponseTypes } from '../../types/interfaces';

const isExistCafeInfo = (rawData: ResponseTypes) => {
  if (rawData.code === STATUS.SUCCESS) {
    return true;
  }

  return false;
};

export default isExistCafeInfo;
