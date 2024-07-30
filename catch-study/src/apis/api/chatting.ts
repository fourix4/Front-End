import { API_ADDRESS, STATUS } from '../../config/api';
import {
  ChattingResponseTypes,
  ChattingRoomResponseTypes,
  ErrorResponseTypes,
  MakeChattingTypes,
} from '../../types/interfaces';
import instance from '../utils/axios';

export const getChattingRoom = async () => {
  try {
    const { data } = await instance.get<ChattingRoomResponseTypes>(
      API_ADDRESS.CHATTING_ROOM,
    );

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export const getChatting = async (chattingRoomId: number) => {
  try {
    const { data } = await instance.get<ChattingResponseTypes>(
      `${API_ADDRESS.CHATTING}/${chattingRoomId}`,
    );

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export const postMakeChatting = async (userId: number, cafeId: number) => {
  try {
    const { data } = await instance.post<MakeChattingTypes>(
      API_ADDRESS.CHATTING,
      {
        user_id: userId,
        cafe_id: cafeId,
      },
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
