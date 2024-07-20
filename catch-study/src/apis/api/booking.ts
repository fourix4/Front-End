import { API_ADDRESS } from '../../config/api';
import {
  BookingHistoryResponseTypes,
  BookingResponseTypes,
  ErrorResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';
import { getInputFormatTime } from '../../utils/time.utils';
import instance from '../utils/axios';

export const getCurrentBooking = async () => {
  try {
    const { data } = await instance.get<BookingResponseTypes>(
      API_ADDRESS.BOOKING,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const patchCheckout = async (bookingId: number) => {
  const params = {
    booking_id: bookingId,
  };

  try {
    const { data } = await instance.patch<ResponseTypes>(API_ADDRESS.CHECKOUT, {
      params,
    });

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const patchCancelRoom = async (bookingId: number) => {
  const params = {
    booking_id: bookingId,
  };

  try {
    const { data } = await instance.patch<ResponseTypes>(
      API_ADDRESS.ROOM_CANCEL,
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

export const getBookingHistoryRecent = async () => {
  try {
    const { data } = await instance.get<BookingHistoryResponseTypes>(
      API_ADDRESS.HISTORY,
    );

    return data;
  } catch (error) {
    const errorObj = error as ErrorResponseTypes;

    return errorObj;
  }
};

export const getBookingHistorySelectDate = async (
  startTime: { year: number; month: number; date: number },
  endTime: { year: number; month: number; date: number },
  page: number,
) => {
  const params = {
    start_date: getInputFormatTime(
      startTime.year,
      startTime.month,
      startTime.date,
    ),
    end_date: getInputFormatTime(endTime.year, endTime.month, endTime.date),
    page,
  };

  try {
    const { data } = await instance.get<BookingHistoryResponseTypes>(
      API_ADDRESS.HISTORY_DATE,
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
