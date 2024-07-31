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
        cafeId: booking.cafe_id,
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

  return [];
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

  return [];
};

export const getDateHistory = (
  rawData: BookingHistoryResponseTypes | ErrorResponseTypes,
): BookingHistoryTypes[] => {
  if (rawData.code === STATUS.SUCCESS && 'data' in rawData) {
    return rawData.data.result.booking_list;
  }

  return [];
};
