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
    const { data } = await instance.patch<ResponseTypes>(API_ADDRESS.BOOKING, {
      params,
    });

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};
