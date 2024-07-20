import { API_ADDRESS } from '../../config/api';
import { SEAT_TYPE } from '../../config/constants';
import {
  ErrorResponseTypes,
  PaymentKakaoResponseTypes,
} from '../../types/interfaces';
import instance from '../utils/axios';

const postPayment = async (
  cafeId: number,
  paymentType: string,
  id: number,
  type: string,
  time: number,
  amount: number,
  startTime = '',
) => {
  const params = {
    cafe_id: cafeId,
    payment_type: paymentType,
    seat_id: type === SEAT_TYPE.SEAT ? id : '',
    room_id: type === SEAT_TYPE.ROOM ? id : '',
    type,
    time,
    amount,
    start_time: startTime,
  };

  try {
    const { data } = await instance.post<PaymentKakaoResponseTypes>(
      API_ADDRESS.PAYMENT_KAKAO,
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

export default postPayment;
