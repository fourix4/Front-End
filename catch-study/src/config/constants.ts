export const ACCESS_TOKEN = 'accessToken';

export const ROUTE = {
  HOME: '/',
  LOGIN: '/login',
  KAKAO_REDIRECT: '/oauthkakao',
  CHATTING: '/chatting',
  CHATTING_ROOM: '/chatting/room',
  MYPAGE: '/mypage',
  BOOKING: '/booking',
  MANAGEMENT: '/management',
  MANAGEMENT_FORM: '/management/form',
  MANAGEMENT_EDIT: '/management/edit/:cafeId',
  MANAGEMENT_DETAIL: '/management/detail/:cafeId',
  STUDYCAFE_BOOKING: '/studycafe/booking',
  PAYMENT: '/payment',
  PAYMENT_SUCCESS: '/payment-success',
  GOOGLE_REDIRECT: 'oauthgoogle',
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
} as const;

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

export const ROLE = { USER: 'roleUser', MANAGER: 'roleManager' };
