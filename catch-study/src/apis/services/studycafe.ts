import {
  ResponseTypes,
  StudyCafeListResponseTypes,
  StudyCafeListTypes,
} from '../../types/interfaces';

const getStudycafeListData = (
  rawData: StudyCafeListResponseTypes | ResponseTypes,
): StudyCafeListTypes[] => {
  if (rawData.data) {
    return rawData.data.result;
  }
  return [];
};

export default getStudycafeListData;
