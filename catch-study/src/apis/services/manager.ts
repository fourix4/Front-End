import { STATUS } from '../../config/api';
import { ResponseTypes } from '../../types/interfaces';

const isExistCafeInfo = (rawData: ResponseTypes) => {
  if (rawData.code >= STATUS.SUCCESS && rawData.code < STATUS.REDIRECTION) {
    return true;
  }

  return false;
};

export default isExistCafeInfo;
