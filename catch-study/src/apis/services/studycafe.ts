import { STATUS } from '../../config/api';
import SEATINGCHART from '../../config/seatingchart';
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
    return {
      seating_chart: '좌석 배치도 이미지 주소',
      seats: Object.keys(SEATINGCHART[1])
        .filter(key => `${key}`.length === 2)
        .map((key, i) => {
          console.log(key);

          return {
            seat_id: i + 1,
            seat_number: key,
            is_available: i % 2 === 0,
          };
        }),
      rooms: [
        {
          room_id: 1,
          room_name: '4인용 스터디룸',
          capacity: 4,
          cancel_available_time: 360, // 분 단위
          price: 5000,
        },
      ],
      usage_fee: [
        {
          hours: 1,
          price: 2000,
        },
        {
          hours: 2,
          price: 3000,
        },
        {
          hours: 5,
          price: 4000,
        },
      ],
    };
  }

  return null;
};

export const getRoomTimetable = (
  rawData: RoomTimeInfoResponseTypes | ErrorResponseTypes,
) => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return ['13:00', '15:00', '23:00'];
    // return rawData.data.result.available_start_time;
  }

  return ['13:00', '15:00', '23:00'];
  return [];
};
