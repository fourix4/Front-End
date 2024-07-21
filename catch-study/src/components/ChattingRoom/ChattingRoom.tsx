import { Client, Frame } from '@stomp/stompjs';
import { useAtom } from 'jotai';
import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { getChatting } from '../../apis/api/chatting';
import { getChattingData } from '../../apis/services/chatting';
import { chattingRoomId } from '../../atoms/chatting';
import { CHATTINGS, ChattingTypes } from '../../types/chatting';
import getTime from '../../utils/time.utils';

const MY_USER_ID = 1;

const ChattingRoom = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [chatting, setChatting] = useState<ChattingTypes[]>(CHATTINGS);
  const [roomId] = useAtom(chattingRoomId);
  const [sendChat, setSencChat] = useState('');
  const [groupedChattings, setGroupedChattings] = useState<
    Record<string, ChattingTypes[]>
  >({});

  const handleSendMessage = () => {
    console.log(sendChat);

    if (stompClient) {
      stompClient.publish({
        destination: `/pub/${roomId}/chat`,
        body: JSON.stringify({ chat: sendChat }),
      });
      setSencChat('');
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatting]);

  useEffect(() => {
    const groupChattingsByDate = (chattings: ChattingTypes[]) => {
      return chattings.reduce(
        (groups: Record<string, ChattingTypes[]>, chat) => {
          const date = chat.createDate.toLocaleDateString();

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
            new Date(a.createDate).getTime() - new Date(b.createDate).getTime(),
        ),
      ),
    );
  }, [chatting]);

  useEffect(() => {
    // id로 채팅 가져오기
    if (!roomId) return;

    (async () => {
      const rawData = await getChatting(roomId);
      const data = getChattingData(rawData);

      setChatting(prev => [...prev, ...data]);

      console.log('이전 채팅', data);
    })();
  }, [roomId, getChatting, getChattingData, setChatting]);

  useEffect(() => {
    if (!roomId) return;

    const socket = new SockJS('http://3.39.182.9:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 1000,
      debug: (str: string) => {
        console.log(str);
      },
      connectHeaders: {
        chatRoodID: roomId.toString(),
      },
    });

    console.log(client);

    client.onConnect = (frame: Frame) => {
      console.log(`/sub/${roomId}/chat`, frame);

      client.subscribe(`/sub/${roomId}/chat`, message => {
        const body = JSON.parse(message.body);
        const newChat: ChattingTypes = {
          userId: body.userId,
          messageId: body.messageId,
          chat: body.chat,
          createDate: new Date(body.createDate),
          messageImage: body.messageImage,
        };

        setChatting(prev => [...prev, newChat]);
      });
    };

    client.onStompError = frame => {
      console.error(`Broker reported error: ${frame.headers}`);
      console.error(`Additional details: ${frame.body}`);
    };

    client.activate();
    setStompClient(client);
  }, [roomId]);

  return (
    <div className='flex flex-col'>
      <div
        ref={scrollContainerRef}
        className='flex flex-col px-20 pt-20 overflow-y-scroll pb-80 h-chat gap-30'
      >
        {Object.keys(groupedChattings).map(date => (
          <div key={date}>
            <div className='flex items-center justify-between flex-grow gap-10 py-10'>
              <div className='w-full h-2 bg-dark-gray'></div>
              <p className='flex-shrink-0 font-normal text-dark-gray text-12'>
                {date}
              </p>
              <div className='w-full h-2 bg-dark-gray'></div>
            </div>

            {groupedChattings[date].map(chat => (
              <div key={chat.createDate.toString()}>
                {chat.userId === MY_USER_ID ? (
                  <div className='relative px-20 py-16 ml-auto font-normal text-white rounded-sm max-w-240 w-max text-start bg-blue text-12'>
                    {chat.chat}
                    <span className='absolute bottom-0 font-normal text-black -left-50 text-dark-gray'>
                      {getTime(chat.createDate)}
                    </span>
                  </div>
                ) : (
                  <div>
                    <span className='font-medium text-16'>카페 이름</span>
                    <div className='relative px-20 py-16 mr-auto font-normal bg-white border-2 rounded-sm w-max max-w-240 text-start border-light-gray text-12'>
                      {chat.chat}
                      <span className='absolute bottom-0 font-normal text-black -right-50 text-dark-gray'>
                        {getTime(chat.createDate)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className='fixed flex items-center justify-between w-10/12 gap-10 p-5 transform -translate-x-1/2 bg-white left-1/2 bottom-20 drop-shadow-xl rounded-default'>
        <input
          type='text'
          value={sendChat}
          onChange={e => setSencChat(e.target.value)}
          className='w-full h-full p-10'
        />
        <div className='items-center w-40 h-40 p-5 rounded-full bg-blue'>
          <button
            onClick={handleSendMessage}
            className='w-full h-full bg-send-plane'
          ></button>
        </div>
      </div>
    </div>
  );
};

export default ChattingRoom;
