import { Client, Frame } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SockJS from 'sockjs-client';
import { getChatting } from '../../apis/api/chatting';
import { getChattingData } from '../../apis/services/chatting';
import { ACCESS_TOKEN, ROUTE } from '../../config/constants';
import { ChattingTypes } from '../../types/chatting';
import { getChatTime, getDateFullFormat } from '../../utils/time.utils';

interface ChattingRoomPropTypes {
  userId: number;
  email: string;
  roomId: string;
  chattingName: string;
}

const ChattingRoom: React.FC<ChattingRoomPropTypes> = ({
  userId,
  email,
  roomId,
  chattingName,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const naviagte = useNavigate();

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatting, setChatting] = useState<ChattingTypes[]>([]);
  const [sendChat, setSendChat] = useState('');
  const [groupedChattings, setGroupedChattings] = useState<
    Record<string, ChattingTypes[]>
  >({});
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (sendChat === '' || !accessToken || !stompClient) {
      return;
    }

    stompClient.publish({
      destination: `/pub/${roomId}/chat`,
      body: JSON.stringify({ chat: sendChat }),
      headers: {
        chatRoodId: roomId.toString(),
        Authorization: `Bearer ${accessToken}`,
        email,
        userId: userId.toString(),
      },
    });

    setSendChat('');
  };

  const scrollToBottom = (behavior: 'auto' | 'smooth' = 'auto') => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior });
    }
  };

  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, clientHeight, scrollHeight } =
        chatContainerRef.current;
      const atBottom = scrollHeight - scrollTop === clientHeight;

      setIsAtBottom(atBottom);

      if (atBottom) {
        setHasNewMessage(false);
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatting]);

  useEffect(() => {
    (async () => {
      if (!roomId) {
        alert('채팅방 정보가 없습니다.');
        naviagte(ROUTE.CHATTING);
        return;
      }

      // 이전 채팅 정보 가져오기
      const chattingRawData = await getChatting(parseInt(roomId, 10));
      const chattingData = getChattingData(chattingRawData);

      setChatting(chattingData);
    })();
  }, [naviagte, roomId]);

  useEffect(() => {
    (async () => {
      // 소켓 연결
      const socket = new SockJS('http://3.39.182.9:8080/ws');
      const client = new Client({
        webSocketFactory: () => socket,
        reconnectDelay: 1000,
        debug: (str: string) => {
          console.log(str);
        },
        connectHeaders: {
          chatRoomId: roomId.toString(),
          Authorization: `Bearer ${accessToken}`,
          email,
          userId: userId.toString(),
        },
      });

      client.onConnect = (frame: Frame) => {
        console.log(`/sub/${roomId}/chat`, frame);

        client.subscribe(
          `/sub/${roomId}/chat`,
          chat => {
            const body = JSON.parse(chat.body);
            const newChat: ChattingTypes = {
              user_id: body.user_id,
              message_id: body.message_id,
              chat: body.chat,
              create_date: new Date(body.create_date),
              message_image: body.message_image,
            };

            // 기존 채팅과 중복 확인 후 추가
            setChatting(prev => {
              const exists = prev.some(
                c => c.message_id === newChat.message_id,
              );

              return exists ? prev : [...prev, newChat];
            });
          },
          {
            chatRoomId: roomId.toString(),
            Authorization: `Bearer ${accessToken}`,
            email,
            userId: userId.toString(),
          },
        );
        scrollToBottom();
      };

      client.onStompError = frame => {
        console.error(`Broker reported error: ${frame.headers}`);
        console.error(`Additional details: ${frame.body}`);
      };

      client.activate();
      setStompClient(client);
    })();
  }, [accessToken, naviagte]);

  useEffect(() => {
    const groupChattingsByDate = (chattings: ChattingTypes[]) => {
      return chattings.reduce(
        (groups: Record<string, ChattingTypes[]>, chat) => {
          const date = new Date(chat.create_date).toLocaleDateString();

          if (!groups[date]) {
            groups[date] = [];
          }
          groups[date].push(chat);
          return groups;
        },
        {},
      );
    };

    setGroupedChattings(
      groupChattingsByDate(
        chatting.sort(
          (a, b) =>
            new Date(a.create_date).getTime() -
            new Date(b.create_date).getTime(),
        ),
      ),
    );
  }, [chatting]);

  return (
    <div className='flex flex-col'>
      <div
        ref={chatContainerRef}
        onScroll={handleScroll}
        className='flex flex-col p-20 overflow-y-scroll h-chat gap-30'
      >
        {Object.keys(groupedChattings).map(date => (
          <div key={date}>
            <div className='flex items-center justify-center'>
              <p className='font-normal text-dark-gray text-10'>
                {getDateFullFormat(new Date(date))}
              </p>
            </div>

            {groupedChattings[date].map((chat, index, chatsArray) => {
              const showCafeName =
                index === 0 || chatsArray[index - 1].user_id !== chat.user_id;

              return (
                <div key={chat.message_id + index}>
                  {chat.user_id === userId ? (
                    <div className='relative mt-10 ml-auto font-normal text-white break-words rounded-sm px-18 py-14 max-w-200 w-max text-start bg-blue text-12'>
                      {chat.chat}
                      <span className='absolute bottom-0 font-normal text-10 -left-36 text-dark-gray'>
                        {getChatTime(chat.create_date)}
                      </span>
                    </div>
                  ) : (
                    <div>
                      {showCafeName && (
                        <span className='font-medium text-12'>
                          {chattingName}
                        </span>
                      )}
                      <div className='relative mb-10 mr-auto font-normal break-words px-18 py-14 bg-bright-gray rounded-e-sm rounded-es-sm w-max max-w-200 text-start text-12'>
                        {chat.chat}
                        <span className='absolute bottom-0 font-normal -right-36 text-10 text-dark-gray'>
                          {getChatTime(chat.create_date)}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
        <div ref={messagesEndRef} className='mb-20' />
      </div>

      {hasNewMessage && !isAtBottom && (
        <div
          onClick={() => scrollToBottom('smooth')}
          className='fixed px-6 py-4 text-white transform -translate-x-1/2 cursor-pointer rounded-default text-10 bottom-76 left-1/2 bg-blue'
        >
          새로운 메시지
        </div>
      )}

      <form
        onSubmit={e => handleSendMessage(e)}
        className='fixed flex items-center justify-between w-10/12 gap-10 p-6 transform -translate-x-1/2 bg-white max-w-700 left-1/2 bottom-20 drop-shadow-xl rounded-default shadow-modal'
      >
        <input
          type='text'
          value={sendChat}
          onChange={e => setSendChat(e.target.value)}
          className='w-full h-full px-10'
        />
        <div className='flex items-center justify-center p-5 rounded-full w-38 h-38 bg-blue'>
          <button type='submit' className='w-24 h-24 bg-send-plane'></button>
        </div>
      </form>
    </div>
  );
};

export default ChattingRoom;
