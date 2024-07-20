export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    result: any;
  };
}

export interface ErrorResponseTypes {
  code: number;
  message: string;
}

export interface LoginResponseTypes extends ResponseTypes {
  data: {
    result: {
      accessToken: string;
    };
  };
}

export interface StudyCafeListTypes {
  cafe_id: number;
  cafe_name: string;
  address: string;
  cafe_image: string;
}

export interface StudyCafeListResponseTypes extends ResponseTypes {
  data: {
    result: StudyCafeListTypes[];
  };
}

export interface CityFilterTypes {
  city: string;
  country: string;
  town: string;
}

export interface StudycafeInfoDataTypes {
  cafe_id: number;
  cafe_name: string;
  address: string;
  cafe_images: string[];
  seating_chart_image: string;
  opening_hours: string;
  closed_hours: string;
  cloesd_day: string;
  cafe_phone: string;
  total_seats: number;
  available_seats: number;
  total_rooms: number;
  available_rooms: number;
}

export interface StudycafeInfoResponseTypes extends ResponseTypes {
  data: {
    result: StudycafeInfoDataTypes;
  };
}

export interface SeatsTypes {
  seat_id: number;
  seat_number: string;
  is_available: boolean; // 사용 불가
}

export interface RoomsTypes {
  room_id: number;
  room_name: string;
  capacity: number;
  cancel_available_time: number; // 분 단위
  price: number;
}

export interface SeatPriceTypes {
  hours: number;
  price: number;
}

export interface StudycafeSeatTypes {
  seating_chart: string;
  seats: SeatsTypes[];
  rooms: RoomsTypes[];
  usage_fee: SeatPriceTypes[];
}

export interface StudycafeSeatResponseTypes extends ResponseTypes {
  data: {
    result: StudycafeSeatTypes;
  };
}

export interface RoomTimeInfoResponseTypes extends ResponseTypes {
  data: {
    result: {
      available_start_time: string[];
    };
  };
}

export interface StudycafeTypes {
  cafeId: number;
  cafeName: string;
}

export interface PaymentKakaoResponseTypes extends ResponseTypes {
  data: {
    result: { next_redirct_pc_url: string };
  };
}

interface CurrentBookingTypes {
  booking_id: number;
  cafe_name: string;
  status: '이용 전' | '이용 중'; //이용 전, 이용 중
  amount: number;
  address: string;
  code: number;
  payment_time: string;
  start_time: string;
  end_time: string;
}

export interface CurrentBookingSeatsTypes extends CurrentBookingTypes {
  seat_number: string;
  start_available_time: string; // 입실 가능 시간
}

export interface CurrentBookingRoomsTypes extends CurrentBookingTypes {
  room_name: string;
}

export interface BookingResponseTypes extends ResponseTypes {
  data: {
    result: {
      seat_list: CurrentBookingSeatsTypes[];
      room_list: CurrentBookingRoomsTypes[];
    };
  };
}

export interface BookingTypes {
  type: 'seat' | 'room';
  id: number;
  cafeName: string;
  status: '이용 전' | '이용 중';
  amount: number;
  address: string;
  name: string;
  code: number;
  paymentTime: string;
  startTime: string;
  endTime: string;
  availableTime?: string;
}

export interface UserResponseTypes extends ResponseTypes {
  data: {
    result: {
      user_name: string;
      email: string;
    };
  };
}

export interface BookingHistoryTypes {
  booking_id: number;
  cafe_id: number;
  cafe_name: string;
  type: string;
  address: string;
  payment_time: string;
  start_time: string;
  end_time: string;
  amount: number;
  status: '입실 전' | '입실 중' | '이용 완료' | '취소됨';
}

export interface BookingHistoryResponseTypes extends ResponseTypes {
  data: {
    result: {
      booking_list: BookingHistoryTypes[];
    };
  };
}

// export interface ManagementResponseTypes extends ResponseTypes {
//   data: {
//     result: FormDataTypes
//   }
// }
