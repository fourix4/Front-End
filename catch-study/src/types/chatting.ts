export interface ChattingRoomTypes {
  chat_room_id: number;
  cafe_id: number;
  cafe_name: string;
  last_chat: string;
  last_chat_date: Date;
  status: boolean;
}

export interface MessageTypes {
  user_id: number;
  message_id: number;
  chat: string;
  create_date: Date;
  message_image: string;
}

export const CHATTING_ROOM_LISTS: ChattingRoomTypes[] = [
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
  {
    chat_room_id: 3,
    cafe_id: 3,
    cafe_name: '열정 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 12:00'),
    status: true,
  },
  {
    chat_room_id: 4,
    cafe_id: 4,
    cafe_name: '행복 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 13:00'),
    status: true,
  },
  {
    chat_room_id: 5,
    cafe_id: 5,
    cafe_name: '도전 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 14:00'),
    status: false,
  },
  {
    chat_room_id: 6,
    cafe_id: 6,
    cafe_name: '꿈꾸는 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 15:00'),
    status: true,
  },
  {
    chat_room_id: 7,
    cafe_id: 7,
    cafe_name: '미래 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 16:00'),
    status: true,
  },
  {
    chat_room_id: 8,
    cafe_id: 8,
    cafe_name: '열정 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 17:00'),
    status: false,
  },
  {
    chat_room_id: 9,
    cafe_id: 9,
    cafe_name: '즐거운 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 18:00'),
    status: true,
  },
  {
    chat_room_id: 10,
    cafe_id: 10,
    cafe_name: '성공 스터디 카페',
    last_chat: '마지막 채팅 내용',
    last_chat_date: new Date('2024-06-28 19:00'),
    status: false,
  },
];

export const MESSAGES: MessageTypes[] = [
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
