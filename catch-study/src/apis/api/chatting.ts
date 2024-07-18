import { API_ADDRESS, STATUS } from '../../config/api';
import {
  ChattingRoomResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';
import instance from '../utils/axios';

export const getChattingRoom = async () => {
  try {
    const { data } = await instance.get<
      ChattingRoomResponseTypes | ResponseTypes
    >(API_ADDRESS.CHATTING_ROOM);

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export const a = null;
