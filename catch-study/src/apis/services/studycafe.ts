import {
  ResponseTypes,
  StudycafeInfoDataTypes,
  StudycafeInfoResponseTypes,
  StudyCafeListResponseTypes,
  StudyCafeListTypes,
} from '../../types/interfaces';

export const getStudycafeListData = (
  rawData: StudyCafeListResponseTypes | ResponseTypes,
): StudyCafeListTypes[] => {
  if (rawData.data) {
    return rawData.data.result;
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