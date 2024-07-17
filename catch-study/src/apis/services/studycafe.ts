import SEATINGCHART from '../../config/seatingchart';
import {
  ResponseTypes,
  RoomTimeInfoResponseTypes,
  StudycafeInfoDataTypes,
  StudycafeInfoResponseTypes,
  StudyCafeListResponseTypes,
  StudyCafeListTypes,
  StudycafeSeatResponseTypes,
  StudycafeSeatTypes,
} from '../../types/interfaces';

export const getStudycafeListData = (
  rawData: StudyCafeListResponseTypes | ResponseTypes,
): StudyCafeListTypes[] => {
  if (rawData.data) {
    return Array(20)
      .fill(0)
      .map((_, i) => ({
        cafe_id: i,
        cafe_name: '이지 스터디 카페',
        address: '서울 강남구 논현동 12번지 2',
        cafe_image: '썸네일_주소',
      }));
    // return rawData.data.result;
  }

  return Array(20)
    .fill(0)
    .map((_, i) => ({
      cafe_id: i,
      cafe_name: '이지 스터디 카페',
      address: '서울 강남구 논현동 12번지 2',
      cafe_image: '썸네일_주소',
    }));
  // return [];
};

export const getStudycafeInfoData = (
  rawData: StudycafeInfoResponseTypes | ResponseTypes,
): StudycafeInfoDataTypes | null => {
  if (rawData.data) {
    return rawData.data.result;
  }

  return {
    cafe_id: 1,
    cafe_name: '이지 스터디 카페',
    address: '서울 강남구 논현동 12번지 12',
    cafe_images: ['이미지주소1', '이미지주소2'],
    seating_chart_image: '좌석배치도 이미지',
    opening_hours: '10:00',
    closed_hours: '20:00',
    cloesd_day: '없음',
    cafe_phone: '010-0000-0000',
    total_seats: 30,
    available_seats: 20,
    total_rooms: 5,
    available_rooms: 2,
  };

  // return null;
};

export const getStudycafeSeatData = (
  rawData: StudycafeSeatResponseTypes | ResponseTypes,
): StudycafeSeatTypes | null => {
  if (rawData.data) {
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
  rawData: RoomTimeInfoResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return ['13:00', '15:00', '23:00'];
    // return rawData.data.result.available_start_time;
  }

  return [];
};
