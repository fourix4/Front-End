interface CityListTypes {
  [key: string]: string[];
}

export const CITY_LIST: CityListTypes = {
  시: [],
  '군/구': [],
  동: [],
};

export const ACCESS_TOKEN = 'accessToken';

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  KAKAO_REDIRECT: '/oauthkakao',
  CHATTING: '/chatting',
  CHATTING_ROOM: '/chatting/:chattingId',
  MYPAGE: '/mypage',
  BOOKING: '/booking',
  MANAGEMENT: '/management',
  MANAGEMENT_INFO: '/management/info',
};

interface MenuTypes {
  [key: string]: string;
}

export const MENU: MenuTypes = {
  로그인: ROUTE.LOGIN,
  마이페이지: ROUTE.MYPAGE,
  '예약 관리': ROUTE.BOOKING,
  채팅: ROUTE.CHATTING,
};

export interface ChattingRoomType {
  chat_room_id: number;
  cafe_id: number;
  cafe_name: string;
  last_chat: string;
  last_chat_date: Date;
  status: boolean;
}

export const CHATTING_ROOM_LISTS: ChattingRoomType[] = [
  {
    chat_room_id: 1,
    cafe_id: 1,
    cafe_name: '이지 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 11:00'),
    status: true,
  },
  {
    chat_room_id: 2,
    cafe_id: 2,
    cafe_name: '초심 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 11:00'),
    status: false,
  },
];

export interface MessageType {
  user_id: number;
  message_id: number;
  chat: string;
  create_date: Date;
  message_image: string;
}

export const MESSAGES: MessageType[] = [
  {
    user_id: 1,
    message_id: 1,
    chat: '메시지 내용1',
    create_date: new Date('2024-06-27 18:00'),
    message_image: '이미지 링크 1',
  },
  {
    user_id: 2,
    message_id: 2,
    chat: '메시지 내용2',
    create_date: new Date('2024-06-27 18:01'),
    message_image: '이미지 링크 2',
  },
];
