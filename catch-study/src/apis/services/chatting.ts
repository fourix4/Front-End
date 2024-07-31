import {
  ChattingRoomIdResponseTypes,
  ChattingRoomResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getChattingRoomData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return null;
};

export const getChattingData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return null;
};

export const getChattingRoomIdData = (
  rawData: ChattingRoomIdResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return null;
};
