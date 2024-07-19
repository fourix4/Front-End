import { CHATTING_ROOM_LISTS, MESSAGES } from '../../types/chatting';
import {
  ChattingRoomResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getChattingRoomData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  console.log('채팅 목록', rawData);

  if (rawData.data) {
    return rawData.data.result;
  }

  return CHATTING_ROOM_LISTS.sort(
    (a, b) =>
      new Date(b.last_chat_date).getTime() -
      new Date(a.last_chat_date).getTime(),
  );
};

export const getChattingData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return MESSAGES.sort(
    (a, b) =>
      new Date(b.create_date).getTime() - new Date(a.create_date).getTime(),
  );
};
