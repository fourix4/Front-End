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
  chattingRoomId: number;
  cafeName: string;
  lastChattingContent: string;
  lastChattingContentTime: string;
  isRead: boolean;
}

export const CHATTING_ROOM_LISTS: ChattingRoomType[] = [
  {
    chattingRoomId: 1,
    cafeName: '이지 스터디 카페',
    lastChattingContent: '마지막 채팅1',
    lastChattingContentTime: '20:00',
    isRead: false,
  },
  {
    chattingRoomId: 2,
    cafeName: '초심 스터디 카페',
    lastChattingContent: '마지막 채팅2',
    lastChattingContentTime: '19:00',
    isRead: true,
  },
];
