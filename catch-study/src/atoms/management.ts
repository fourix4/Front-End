import { atom } from 'jotai';
import {
  FormDataTypes,
  RoomInfoTypes,
  UsageFeeTypes,
} from '../types/management';

export const roomInfosAtom = atom<RoomInfoTypes[]>([]);
export const cancelTimeAtom = atom<number>(0);
export const usageFeesAtom = atom<UsageFeeTypes[]>([]);
export const thumbnailAtom = atom<File | null>(null);
export const storeImagesAtom = atom<File[]>([]);
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
  room_info: [
    {
      cancel_available_time: 0,
      rooms: [],
    },
  ],
  usage_fee: [],
  title_image: null,
  multiple_images: [],
  seatChart_image: '',
  cafe_phone: '',
});
