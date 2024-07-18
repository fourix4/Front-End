export interface AddressTypes {
  city: string;
  country: string;
  town: string;
  etc: string;
}

export interface RoomInfoTypes {
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
  room_info: [
    {
      cancel_available_time: number;
      rooms: RoomInfoTypes[];
    },
  ];
  usage_fee: UsageFeeTypes[];
  title_image: File | null;
  multiple_images: File[];
  seatChart_image: string;
  cafe_phone: string;
}
