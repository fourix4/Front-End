export interface ResponseTypes {
  code: number;
  message: string;
  data?: {
    result: any;
  };
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
