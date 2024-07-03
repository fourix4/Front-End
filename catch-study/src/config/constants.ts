interface CityListTypes {
  [key: string]: string[];
}

export const SERVER_URL = 'http://localhost:8080/';

export const CITY_LIST: CityListTypes = {
  시: [],
  '군/구': [],
  동: [],
};

export const REST_API_KEY = '2cf7340813dcbc2896890c0087cdcce4';
export const KAKAO_REDIRECT_URI = 'http://localhost:3000/oauthkakao';
