import { API_ADDRESS, STATUS } from '../../config/api';
import { BookingResponseTypes, ResponseTypes } from '../../types/interfaces';
import instance from '../utils/axios';

const getCurrentBooking = async () => {
  try {
    const { data } = await instance.get<BookingResponseTypes | ResponseTypes>(
      API_ADDRESS.BOOKING,
    );

    return data;
  } catch (error) {
    return { code: STATUS.SERVER_ERROR, message: 'Server Error' };
  }
};

export default getCurrentBooking;
