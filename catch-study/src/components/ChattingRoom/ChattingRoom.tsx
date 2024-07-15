import { Client, Frame } from '@stomp/stompjs';
import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { MESSAGES } from '../../config/constants';
import getTime from '../../utils/time.utils';

const MY_USER_ID = 1;
// const RECIPIENT_ID = 2;

const ChattingRoom = () => {
  const [chatting, setChatting] = useState('');
  const [stompClient, setStompClient] = useState<Client | null>(null);

  const handleSendMessage = () => {
    if (stompClient) {
      stompClient.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify('hi'),
      });
      setChatting('');
    }
  };

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      debug: (str: string) => {
        console.log(str);
      },
    });

    // 연결 상태 메시지 구독
    client.onConnect = (frame: Frame) => {
      console.log('connect success', frame);

      client.subscribe('/topic/connection-status', message => {
        const statusMessage = JSON.parse(message.body);

        console.log(statusMessage.message);
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

    return () => {
      client.deactivate();
    };
  }, []);

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
        {MESSAGES.map(message => (
          <div key={message.message_id}>
            {message.user_id === MY_USER_ID ? (
              <div className='relative px-20 py-16 ml-auto font-normal text-white rounded-sm w-240 text-start bg-blue text-16'>
                {message.chat}
                <span className='absolute bottom-0 font-normal text-black -left-50 text-12 text-dark-gray'>
                  {getTime(message.create_date)}
                </span>
              </div>
            ) : (
              <div>
                <span className='font-medium text-16'>카페 이름</span>
                <div className='relative px-20 py-16 mr-auto font-normal bg-white border-2 rounded-sm w-240 text-start border-light-gray text-16'>
                  {message.chat}
                  <span className='absolute bottom-0 font-normal text-black -right-50 text-12 text-dark-gray'>
                    {getTime(message.create_date)}
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
