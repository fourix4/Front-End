interface CityListTypes {
  시: string[];
  '군/구': {
    [key: string]: string[];
  };
  동: {
    [key: string]: string[];
  };
}

export const CITY_LIST: CityListTypes = {
  시: ['서울'],
  '군/구': {
    서울: ['종로구', '중구', '용산구', '성동구'],
  },
  동: {
    종로구: ['청운효자동', '사직동', '삼청동'],
    중구: ['소곡동', '회현동', '명동'],
    용산구: ['후암동', '용산2가동', '남영동'],
    성동구: ['왕십리제2동', '왕십리도선동', '마장동'],
  },
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
  MANAGEMENT_FORM: '/management/form',
  STUDYCAFE_BOOKING: '/studycafe/booking',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment-success',
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

export const SEAT_TYPE = {
  SEAT: 'seat',
  ROOM: 'room',
};

export const TIME_TABLE = Array.from({ length: 48 }, (_, i) => {
  if (i === 0) {
    return 0;
  }

  return Math.floor(i / 2);
}).map((v, i) => {
  let result = '';

  result += v < 10 ? `0${v}` : `${v}`;
  result += ':';
  result += i % 2 === 0 ? '00' : '30';

  return result;
});

export const PAYMENT_TYPE = ['카카오페이'];

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
