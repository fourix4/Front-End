export interface ChattingRoomTypes {
  chatRoomId: number;
  cafeId: number;
  cafeName: string;
  lastChat: string;
  lastChatDate: Date;
  status: boolean;
}

export interface ChattingTypes {
  userId: number;
  messageId: number;
  chat: string;
  createDate: Date;
  messageImage: string;
}

export const CHATTING_ROOM_LISTS: ChattingRoomTypes[] = [
  {
    chatRoomId: 1,
    cafeId: 1,
    cafeName: '이지 스터디 카페',
    lastChat: '마지막 채팅 내용',
    lastChatDate: new Date('2024-06-28 11:00'),
    status: true,
  },
  {
    chatRoomId: 2,
    cafeId: 2,
    cafeName: '초심 스터디 카페',
    lastChat: '마지막 채팅 내용',
    lastChatDate: new Date('2024-06-28 11:00'),
    status: false,
  },
];

export const CHATTINGS: ChattingTypes[] = [
  {
    userId: 1,
    messageId: 1,
    chat: '메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 메시지 내용 ',
    createDate: new Date('2024-06-27 18:00'),
    messageImage: '이미지 링크 1',
  },
  {
    userId: 2,
    messageId: 2,
    chat: '메시지 내용2',
    createDate: new Date('2024-06-27 18:01'),
    messageImage: '이미지 링크 2',
  },
  {
    userId: 1,
    messageId: 3,
    chat: '메시지 내용3',
    createDate: new Date('2024-06-27 18:02'),
    messageImage: '이미지 링크 3',
  },
  {
    userId: 2,
    messageId: 4,
    chat: '메시지 내용4',
    createDate: new Date('2024-06-27 18:03'),
    messageImage: '이미지 링크 4',
  },
  {
    userId: 1,
    messageId: 5,
    chat: '메시지 내용5',
    createDate: new Date('2024-06-27 18:04'),
    messageImage: '이미지 링크 5',
  },
  {
    userId: 2,
    messageId: 6,
    chat: '메시지 내용6',
    createDate: new Date('2024-06-30 18:05'),
    messageImage: '이미지 링크 6',
  },
  {
    userId: 1,
    messageId: 7,
    chat: '메시지 내용7',
    createDate: new Date('2024-06-29 18:06'),
    messageImage: '이미지 링크 7',
  },
  {
    userId: 2,
    messageId: 8,
    chat: '메시지 내용8',
    createDate: new Date('2024-06-28 18:07'),
    messageImage: '이미지 링크 8',
  },
  {
    userId: 1,
    messageId: 9,
    chat: '메시지 내용9',
    createDate: new Date('2024-06-28 18:08'),
    messageImage: '이미지 링크 9',
  },
  {
    userId: 2,
    messageId: 10,
    chat: '메시지 내용10',
    createDate: new Date('2024-06-27 18:09'),
    messageImage: '이미지 링크 10',
  },
  {
    userId: 2,
    messageId: 11,
    chat: '메시지 내용11',
    createDate: new Date('2024-06-27 18:09'),
    messageImage: '이미지 링크 10',
  },
  {
    userId: 2,
    messageId: 12,
    chat: '메시지 내용12',
    createDate: new Date('2024-06-27 18:09'),
    messageImage: '이미지 링크 10',
  },
  {
    userId: 2,
    messageId: 13,
    chat: '메시지 내용13',
    createDate: new Date('2024-06-27 18:09'),
    messageImage: '이미지 링크 10',
  },
];
