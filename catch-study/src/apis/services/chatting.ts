import { CHATTING_ROOM_LISTS } from '../../types/chatting';
import {
  ChattingRoomResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

const getChattingRoomData = (
  rawData: ChattingRoomResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return CHATTING_ROOM_LISTS.sort(
    (a, b) =>
      new Date(b.last_chat_date).getTime() -
      new Date(a.last_chat_date).getTime(),
  );
};

export default getChattingRoomData;
