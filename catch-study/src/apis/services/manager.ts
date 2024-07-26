import { STATUS } from '../../config/api';
import { CafeInfoResponseTypes } from '../../types/interfaces';

const getCafeInfoData = (rawData: CafeInfoResponseTypes) => {
  if (rawData.code === STATUS.SUCCESS && rawData.data) {
    return rawData.data.result;
  }

  return null;
};

export default getCafeInfoData;
