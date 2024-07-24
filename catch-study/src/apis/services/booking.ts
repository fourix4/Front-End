import { STATUS } from '../../config/api';
import { SEAT_TYPE } from '../../config/constants';
import {
  BookingHistoryResponseTypes,
  BookingHistoryTypes,
  BookingResponseTypes,
  BookingTypes,
  ErrorResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';

export const getBookingList = (
  rawData: BookingResponseTypes | ErrorResponseTypes,
): BookingTypes[] => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
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
        cafe_id: booking.cafe_id,
        id: booking.booking_id,
        cafe_name: booking.cafe_name,
        status: booking.status,
        amount: booking.amount,
        address: booking.address,
        name: '',
        code: booking.code,
        payment_time: booking.payment_time,
        start_time: booking.start_time,
        end_time: booking.end_time,
        availableTime: '',
      };

      if ('start_available_time' in booking) {
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
      cafe_id: 1,
      cafe_name: '이지 스터디 카페',
      status: '이용 전',
      amount: 10000,
      address: '서울시 종로구 xxx',
      name: '1A',
      code: 1234,
      payment_time: '2024-6-27 12:36',
      start_time: '2024-6-27 12:50',
      end_time: '2024-6-27 14:50',
      availableTime: '2024-6-27 13:06',
    },
    {
      type: 'room',
      id: 2,
      cafe_id: 2,
      cafe_name: '이지 스터디 카페',
      status: '이용 전',
      amount: 10000,
      address: '서울시 종로구 xxx',
      name: '4인실 스터디룸',
      code: 1234,
      payment_time: '2024-6-27 12:36',
      start_time: '2024-6-27 12:50',
      end_time: '2024-6-27 14:50',
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

export const getCheckoutErrorMessage = (rawData: ErrorResponseTypes) => {
  return rawData.message;
};

export const isSuccessCancel = (rawData: ResponseTypes) => {
  if (rawData.code === STATUS.SUCCESS) {
    return true;
  }
  return false;
};

export const getCancelErrorMessage = (rawData: ErrorResponseTypes) => {
  return rawData.message;
};

export const getRecentHistory = (
  rawData: BookingHistoryResponseTypes | ErrorResponseTypes,
): BookingHistoryTypes[] => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result.booking_list;
  }

  return [
    {
      booking_id: 1,
      cafe_id: 1,
      cafe_name: '이지 스터디 카페',
      type: 'seat',
      address: '인천시 부평구 ---',
      payment_time: '2024-01-04 19:34',
      start_time: '2024-01-04 19:44',
      end_time: '2024-01-04 20:44',
      amount: 3000,
      status: '이용 완료',
    },
    {
      booking_id: 2,
      cafe_id: 1,
      cafe_name: '이지 스터디 카페',
      type: 'room',
      address: '인천시 부평구 ---',
      payment_time: '2024-01-04 19:34',
      start_time: '2024-01-04 19:44',
      end_time: '2024-01-04 20:44',
      amount: 3000,
      status: '취소됨',
    },
    {
      booking_id: 2,
      cafe_id: 1,
      cafe_name: '이지 스터디 카페',
      type: 'room',
      address: '인천시 부평구 ---',
      payment_time: '2024-01-04 19:34',
      start_time: '2024-01-04 19:44',
      end_time: '2024-01-04 20:44',
      amount: 3000,
      status: '입실 중',
    },
  ];

  // return [];
};

export const getDateHistory = (
  rawData: BookingHistoryResponseTypes | ErrorResponseTypes,
): BookingHistoryTypes[] => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result.booking_list;
  }

  return Array(10).fill({
    booking_id: 2,
    cafe_id: 1,
    cafe_name: '이지 스터디 카페',
    type: 'room',
    address: '인천시 부평구 ---',
    payment_time: '2024-01-04 19:34',
    start_time: '2024-01-04 19:44',
    end_time: '2024-01-04 20:44',
    amount: 3000,
    status: '입실 중',
  });
};
