import { CafeInfoResponseTypes, ResponseTypes } from '../../types/interfaces';

export const getCafeInfoData = (
  rawData: ResponseTypes | CafeInfoResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return null;
};
