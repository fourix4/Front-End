import { API_ADDRESS } from '../../config/api';
import {
  BookingResponseTypes,
  ErrorResponseTypes,
  ResponseTypes,
} from '../../types/interfaces';
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
