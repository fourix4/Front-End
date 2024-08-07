import { STATUS } from '../../config/api';
import {
  CafeInfoResponseTypes,
  CafeStatusReponseTypes,
  ErrorResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getCafeInfoData = (
  rawData: CafeInfoResponseTypes | ErrorResponseTypes,
) => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result;
  }

  return null;
};

export const isSuccessCafeInfo = (rawData: ResponseTypes) => {
  if (rawData.code === STATUS.SUCCESS) {
    return true;
  }

  return false;
};

export const getCafeStatusData = (
  rawData: CafeStatusReponseTypes | ErrorResponseTypes,
) => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result;
  }

  return [];
};
