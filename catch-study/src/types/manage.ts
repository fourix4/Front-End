export interface AddressTypes {
  city: string;
  country: string;
  town: string;
  etc: string;
}

export interface RoomInfoTypes {
  name: string;
  capacity: number;
}

export interface UsageFeeTypes {
  hours: number;
  price: number;
}

export interface FormDataTypes {
  cafeName: string;
  address: AddressTypes;
  openingHours: string;
  closedHours: string;
  closedDay: string;
  seats: number;
  roomInfo: [
    {
      cancelAvailableTime: number;
      rooms: RoomInfoTypes[];
    },
  ];
  usageFee: UsageFeeTypes[];
  titleImage: string;
  multipleImages: string[];
  seatChartImage: string;
  cafePhone: string;
}
