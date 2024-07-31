export interface ChattingRoomTypes {
  chat_room_id: number;
  cafe_id: number;
  name: string;
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
