import { Client, Frame } from '@stomp/stompjs';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { getChatting } from '../../apis/api/chatting';
import { getChattingData } from '../../apis/services/chatting';
import { chattingRoomId } from '../../atoms/chatting';
import { MESSAGES, MessageTypes } from '../../types/chatting';
import getTime from '../../utils/time.utils';

const MY_USER_ID = 1;

const ChattingRoom = () => {
  const [chatting, setChatting] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);
  const [prevChatting, setPrevChatting] = useState<MessageTypes[]>(MESSAGES);
  const [roomId] = useAtom(chattingRoomId);

  console.log(roomId);

  const handleSendMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: `/pub/${roomId}/chat`,
        body: JSON.stringify('hi'),
      });
      setChatting('');
    }
  };

  useEffect(() => {
    // id로 채팅 가져오기
    if (!roomId) return;

    (async () => {
      const rawData = await getChatting(roomId);
      const data = getChattingData(rawData);

      setPrevChatting(prev => [...prev, ...data]);

      console.log('데이터', data);
    })();
  }, [roomId, getChatting, getChattingData, setPrevChatting]);

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
        console.log(JSON.parse(message.body));
      });
    };

    // client.onConnect = frame => {
    //   console.log('Connection successful', frame);

    //   client.subscribe(`/user/${MY_USER_ID}/queue`, (newMessage: Message) => {
    //     const chatMessage: ChatMessage = JSON.parse(newMessage.body);

    //     setChattings(prevMessages => [...prevMessages, chatMessage]);
    //   });
    // };

    client.onStompError = frame => {
      console.error(`Broker reported error: ${frame.headers}`);
      console.error(`Additional details: ${frame.body}`);
    };

    client.activate();
    setStompClient(client);

    // return () => {
    //   client.deactivate();
    // };
  }, [roomId]);

  return (
    <div className='flex flex-col py-20'>
      <div className='flex flex-col px-20 pt-20 overflow-y-scroll gap-30'>
        <div className='flex items-center justify-between flex-grow gap-10'>
          <div className='w-full h-2 bg-dark-gray'></div>
          <p className='flex-shrink-0 font-normal text-dark-gray text-12'>
            {'6월 26일'}
          </p>
          <div className='w-full h-2 bg-dark-gray'></div>
        </div>
        {prevChatting &&
          prevChatting.map(message => (
            <div key={message.messageId}>
              {message.userId === MY_USER_ID ? (
                <div className='relative px-20 py-16 ml-auto font-normal text-white rounded-sm w-240 text-start bg-blue text-16'>
                  {message.chat}
                  <span className='absolute bottom-0 font-normal text-black -left-50 text-12 text-dark-gray'>
                    {getTime(message.createDate)}
                  </span>
                </div>
              ) : (
                <div>
                  <span className='font-medium text-16'>카페 이름</span>
                  <div className='relative px-20 py-16 mr-auto font-normal bg-white border-2 rounded-sm w-240 text-start border-light-gray text-16'>
                    {message.chat}
                    <span className='absolute bottom-0 font-normal text-black -right-50 text-12 text-dark-gray'>
                      {getTime(message.createDate)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>

      <div className='fixed flex items-center justify-between w-10/12 gap-10 p-5 transform -translate-x-1/2 bg-white left-1/2 bottom-20 drop-shadow-xl rounded-default'>
        <input
          type='text'
          value={chatting}
          onChange={e => setChatting(e.target.value)}
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
