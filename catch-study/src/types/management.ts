export interface AddressTypes {
  city: string;
  country: string;
  town: string;
  etc: string;
}

export interface RoomInfoTypes {
  // id? : string
  name: string;
  capacity: number;
  price: number;
}

export interface UsageFeeTypes {
  hours: number;
  price: number;
}

export interface FormDataTypes {
  cafe_name: string;
  address: AddressTypes;
  opening_hours: string;
  closed_hours: string;
  closed_day: string;
  seats: number;
  room_info: {
    cancel_available_time: number;
    rooms: RoomInfoTypes[];
  };

  usage_fee: UsageFeeTypes[];
  title_image: File | string | null;
  multiple_images: File[] | string[];
  cafe_phone: string;
}

export interface CafeInfoTypes {
  cafe_name: string;
  address: AddressTypes;
  opening_hours: string;
  closed_hours: string;
  closed_day: string;
  seats: number;
  room_info: {
    cancel_available_time: number;
    rooms: RoomInfoTypes[];
  };

  usage_fee: UsageFeeTypes[];
  title_image: string | null;
  multiple_images: string[];
  cafe_phone: string;
}
