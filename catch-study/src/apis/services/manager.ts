import { CafeInfoResponseTypes, ResponseTypes } from '../../types/interfaces';

const getCafeInfoData = (rawData: ResponseTypes | CafeInfoResponseTypes) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return null;
};

export default getCafeInfoData;
