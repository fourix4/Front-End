import { BookingResponseTypes, ResponseTypes } from '../../types/interfaces';

export const getBookingSeats = (
  rawData: BookingResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return rawData;
  }

  return [];
};

export const getBookingRooms = (
  rawData: BookingResponseTypes | ResponseTypes,
) => {
  if (rawData.data) {
    return true;
  }
  return false;
};
