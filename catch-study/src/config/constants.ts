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
