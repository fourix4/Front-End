import { API_ADDRESS } from '../../config/api';
import {
  CityFilterTypes,
  ErrorResponseTypes,
  RoomTimeInfoResponseTypes,
  StudyCafeListResponseTypes,
  StudycafeSeatResponseTypes,
} from '../../types/interfaces';
import instance from '../utils/axios';

export const getStudycafeList = async (
  { city, country, town }: CityFilterTypes,
  page: number,
) => {
  const params = { city, country, town, page };

  try {
    const { data } = await instance.get<StudyCafeListResponseTypes>(
      API_ADDRESS.STUDYCAFE_SEARCH_URI,
      {
        params,
      },
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getStudycafeInfo = async (studycafeId: number) => {
  try {
    const { data } = await instance.get<StudyCafeListResponseTypes>(
      `${API_ADDRESS.STUDYCAFE_INFO}/${studycafeId}`,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getStudycafeSeatingChart = async (studycafeId: number) => {
  try {
    const { data } = await instance.get<StudycafeSeatResponseTypes>(
      `${API_ADDRESS.STUDYCAFE_INFO}/${studycafeId}${API_ADDRESS.STUDYCAFE_SEATING_CHART}`,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getRoomTimeInfo = async (
  roomId: number,
  date: number,
  time: number,
) => {
  const params = { roomId, date, time };

  try {
    const { data } = await instance.get<RoomTimeInfoResponseTypes>(
      API_ADDRESS.ROOM_TIME_INFO,
      {
        params,
      },
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};
