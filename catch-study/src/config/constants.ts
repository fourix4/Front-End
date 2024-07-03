interface CityListTypes {
  [key: string]: string[];
}

const CITY_LIST: CityListTypes = {
  시: [],
  '군/구': [],
  동: [],
};

export default CITY_LIST;

export interface ChattingRoomType {
  chat_room_id: number;
  cafe_id: number;
  cafe_name: string;
  last_chat: string;
  last_chat_date: string;
  status: boolean;
}

export const CHATTING_ROOM_LISTS: ChattingRoomType[] = [
  {
    chat_room_id: 1,
    cafe_id: 1,
    cafe_name: '이지 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: '2024-06-28 11:00',
    status: true,
  },
  {
    chat_room_id: 2,
    cafe_id: 2,
    cafe_name: '초심 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: '2024-06-28 11:00',
    status: false,
  },
];

// const CHATTINGS = [];
