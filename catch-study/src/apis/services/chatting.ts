import { CHATTING_ROOM_LISTS, CHATTINGS } from '../../types/chatting';
import {
  ChattingRoomResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getChattingRoomData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return CHATTING_ROOM_LISTS.sort(
    (a, b) =>
      new Date(b.lastChatDate).getTime() - new Date(a.lastChatDate).getTime(),
  );
};

export const getChattingData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return CHATTINGS.sort(
    (a, b) =>
      new Date(b.createDate).getTime() - new Date(a.createDate).getTime(),
  );
};
