import axios from 'axios';
import { API_ADDRESS, STATUS } from '../../config/api';
import { BookingResponseTypes, ResponseTypes } from '../../types/interfaces';
import instance from '../utils/axios';

export const getCurrentBooking = async () => {
  try {
    const { data } = await instance.get<BookingResponseTypes | ResponseTypes>(
      API_ADDRESS.BOOKING,
    );

    console.log(data);

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
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
    if (axios.isAxiosError(error) && error.response) {
      return {
        code: error.response.status,
        message: '입실 중인 좌석이 존재하지 않습니다.',
      };
    }

    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
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
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};
