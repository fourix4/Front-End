import { atom } from 'jotai';
import {
  AddressTypes,
  CafeInfoTypes,
  FormDataTypes,
  RoomInfoTypes,
  UsageFeeTypes,
} from '../types/management';

export const roomInfosAtom = atom<RoomInfoTypes[]>([]);
export const addressAtom = atom<AddressTypes>({
  city: '',
  country: '',
  town: '',
  etc: '',
});
export const cancelTimeAtom = atom<number>(0);
export const usageFeesAtom = atom<UsageFeeTypes[]>([]);
export const thumbnailAtom = atom<File | string | null>(null);
export const storeImagesAtom = atom<File[] | string[]>([]);
export const formDataAtom = atom<FormDataTypes>({
  cafe_name: '',
  address: {
    city: '',
    country: '',
    town: '',
    etc: '',
  },
  opening_hours: '',
  closed_hours: '',
  closed_day: '',
  seats: 0,
  room_info: {
    cancel_available_time: 0,
    rooms: [],
  },
  seat_chart_image: '',
  usage_fee: [],
  title_image: null,
  multiple_images: [],
  cafe_phone: '',
});

export const cafeInfoAtom = atom<CafeInfoTypes>({
  cafe_id: '',
  cafe_name: '',
  address: {
    city: '',
    country: '',
    town: '',
    etc: '',
  },
  opening_hours: '',
  closed_hours: '',
  closed_day: '',
  seats: 0,
  room_info: {
    cancel_available_time: 0,
    rooms: [],
  },
  seat_chart_image: '',
  usage_fee: [],
  title_image: null,
  multiple_images: [],
  cafe_phone: '',
});
