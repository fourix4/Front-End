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
