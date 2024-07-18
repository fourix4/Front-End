import {
  BookingResponseTypes,
  BookingTypes,
  ResponseTypes,
} from '../../types/interfaces';

const getBookingList = (
  rawData: BookingResponseTypes | ResponseTypes,
): BookingTypes[] => {
  //   if (rawData.data) {
  //     const list = [
  //       ...rawData.data.result.seat_list,
  //       ...rawData.data.result.room_list,
  //     ];

  //     if (!list.length) {
  //       return [];
  //     }
  //   }

  console.log(rawData);

  return [
    {
      type: 'seat',
      id: 1,
      cafeName: '이지 스터디 카페',
      status: '이용 전',
      amount: 10000,
      address: '서울시 종로구 xxx',
      name: '1A',
      code: 1234,
      paymentTime: '2024-6-27 12:36',
      startTime: '2024-6-27 12:50',
      endTime: '2024-6-27 14:50',
      availableTime: '2024-6-27 13:06',
    },
    {
      type: 'room',
      id: 1,
      cafeName: '이지 스터디 카페',
      status: '이용 전',
      amount: 10000,
      address: '서울시 종로구 xxx',
      name: '4인실 스터디룸',
      code: 1234,
      paymentTime: '2024-6-27 12:36',
      startTime: '2024-6-27 12:50',
      endTime: '2024-6-27 14:50',
    },
  ];

  // return []
};

export default getBookingList;
