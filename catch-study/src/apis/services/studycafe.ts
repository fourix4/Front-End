import { STATUS } from '../../config/api';
import {
  ErrorResponseTypes,
  RoomTimeInfoResponseTypes,
  StudycafeInfoDataTypes,
  StudycafeInfoResponseTypes,
  StudyCafeListResponseTypes,
  StudyCafeListTypes,
  StudycafeSeatResponseTypes,
  StudycafeSeatTypes,
} from '../../types/interfaces';

export const getStudycafeListData = (
  rawData: StudyCafeListResponseTypes | ErrorResponseTypes,
): StudyCafeListTypes[] => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result;
  }

  return [];
};

export const getStudycafeInfoData = (
  rawData: StudycafeInfoResponseTypes | ErrorResponseTypes,
): StudycafeInfoDataTypes | null => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result;
  }

  return null;
};

export const getStudycafeSeatData = (
  rawData: StudycafeSeatResponseTypes | ErrorResponseTypes,
): StudycafeSeatTypes | null => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result;
  }

  return null;
};

export const getRoomTimetable = (
  rawData: RoomTimeInfoResponseTypes | ErrorResponseTypes,
) => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result.available_start_time;
  }

  return [];
};
