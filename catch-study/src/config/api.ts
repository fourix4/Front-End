export const API_ADDRESS = {
  KAKAO_LOGIN_URI: '/users/login/kakao',
  REISSUANCE_URI: '/users/reissuance',
  LOGOUT_URI: '/users/logout',
  STUDYCAFE_SEARCH_URI: '/studycafes/search',
  MANAGER_INFO_URI: '/manager',
  STUDYCAFE_INFO: '/studycafes',
  STUDYCAFE_SEATING_CHART: '/seatingchart',
  ROOM_TIME_INFO: '/studycafes/timeinfo',
  DELETE_USER: '/user',
  PAYMENT_KAKAO: '/studycafes/seats',
  BOOKING: '/booking',
  CHECKOUT: '/booking/checkout',
  ROOM_CANCEL: '/booking/rooms/cancel',
};

export const STATUS = {
  SUCCESS: 200,
  REDIRECTION: 300,
  IMAGE_ERROR: 400,
  ACCESS_TOKEN_EXPIRATION_ERROR: 401,
  REFRESH_TOKEN_EXPIRATION_ERROR: 403,
  UNAUTHORIZED_USER_ERROR: 404,
  METHOD_NOT_ALLOWED_ERROR: 405,
  BOOKING_ERROR: 406,
  SERVER_ERROR: 500,
};
