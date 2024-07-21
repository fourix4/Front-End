export interface ChattingRoomTypes {
  chatRoomId: number;
  cafeId: number;
  cafeName: string;
  lastChat: string;
  lastChatDate: Date;
  status: boolean;
}

export interface MessageTypes {
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

export const MESSAGES: MessageTypes[] = [
  {
    userId: 1,
    messageId: 1,
    chat: '메시지 내용1',
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
];
