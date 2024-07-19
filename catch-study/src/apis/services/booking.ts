import { STATUS } from '../../config/api';
import { SEAT_TYPE } from '../../config/constants';
import {
  BookingResponseTypes,
  BookingTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getBookingList = (
  rawData: BookingResponseTypes | ResponseTypes,
): BookingTypes[] => {
  if (rawData.data) {
    const list = [
      ...rawData.data.result.seat_list,
      ...rawData.data.result.room_list,
    ];

    if (!list.length) {
      return [];
    }

    return list.map(booking => {
      const result: BookingTypes = {
        type: SEAT_TYPE.SEAT,
        id: booking.booking_id,
        cafeName: booking.cafe_name,
        status: booking.status,
        amount: booking.amount,
        address: booking.address,
        name: '',
        code: booking.code,
        paymentTime: booking.payment_time,
        startTime: booking.start_time,
        endTime: booking.end_time,
        availableTime: '',
      };

      if (booking.start_available_time) {
        result.type = SEAT_TYPE.SEAT;
        result.name = booking.seat_number;
        result.availableTime = booking.start_available_time;
      } else {
        result.type = SEAT_TYPE.ROOM;
        result.name = booking.room_name;
      }

      return result;
    });
  }

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
      id: 2,
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

export const isSuccessCheckout = (rawData: ResponseTypes) => {
  if (rawData.code === STATUS.SUCCESS) {
    return true;
  }
  return false;
};
