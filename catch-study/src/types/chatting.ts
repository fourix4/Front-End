export interface ChattingRoomTypes {
  chat_room_id: number;
  cafe_id: number;
  cafe_name: string;
  last_chat: string;
  last_chat_date: Date;
  status: boolean;
}

export interface ChattingTypes {
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
];

export const CHATTINGS: ChattingTypes[] = [
  {
    user_id: 1,
    message_id: 1,
    chat: '메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 ',
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
  {
    user_id: 1,
    message_id: 3,
    chat: '메시지 내용3',
    create_date: new Date('2024-06-27 18:02'),
    message_image: '이미지 링크 3',
  },
  {
    user_id: 2,
    message_id: 4,
    chat: '메시지 내용4',
    create_date: new Date('2024-06-27 18:03'),
    message_image: '이미지 링크 4',
  },
  {
    user_id: 1,
    message_id: 5,
    chat: '메시지 내용5',
    create_date: new Date('2024-06-27 18:04'),
    message_image: '이미지 링크 5',
  },
  {
    user_id: 2,
    message_id: 6,
    chat: '메시지 내용6',
    create_date: new Date('2024-06-30 18:05'),
    message_image: '이미지 링크 6',
  },
  {
    user_id: 1,
    message_id: 7,
    chat: '메시지 내용7',
    create_date: new Date('2024-06-29 18:06'),
    message_image: '이미지 링크 7',
  },
  {
    user_id: 2,
    message_id: 8,
    chat: '메시지 내용8',
    create_date: new Date('2024-06-28 18:07'),
    message_image: '이미지 링크 8',
  },
  {
    user_id: 1,
    message_id: 9,
    chat: '메시지 내용9',
    create_date: new Date('2024-06-28 18:08'),
    message_image: '이미지 링크 9',
  },
  {
    user_id: 2,
    message_id: 10,
    chat: '메시지 내용10',
    create_date: new Date('2024-06-27 18:09'),
    message_image: '이미지 링크 10',
  },
  {
    user_id: 2,
    message_id: 11,
    chat: '메시지 내용11',
    create_date: new Date('2024-06-27 18:09'),
    message_image: '이미지 링크 10',
  },
  {
    user_id: 2,
    message_id: 12,
    chat: '메시지 내용12',
    create_date: new Date('2024-06-27 18:09'),
    message_image: '이미지 링크 10',
  },
  {
    user_id: 2,
    message_id: 13,
    chat: '메시지 내용13',
    create_date: new Date('2024-06-27 18:09'),
    message_image: '이미지 링크 10',
  },
];
