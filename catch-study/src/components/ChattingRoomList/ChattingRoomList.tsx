import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChattingRoom } from '../../apis/api/chatting';
import getChattingRoomData from '../../apis/services/chatting';
import { ChattingRoomTypes } from '../../types/chatting';
import getTime from '../../utils/time.utils';

const ChattingRoomList: React.FC = () => {
  const [chattingRooms, setChattingRooms] = useState<ChattingRoomTypes[]>([]);

  useEffect(() => {
    (async () => {
      const rawData = await getChattingRoom();
      const data = getChattingRoomData(rawData);

      setChattingRooms(data);
      console.log(data);
    })();
  }, [chattingRooms]);

  return (
    <ul>
      {chattingRooms.map(chattingRoom => (
        <li
          key={chattingRoom.chat_room_id}
          className='relative w-full p-20 border-b-2 cursor-pointer border-light-gray'
        >
          <Link
            to={`/chatting/${chattingRoom.chat_room_id}`}
            className='block w-full h-full'
          >
            {!chattingRoom.status && (
              <span className='absolute rounded-full bottom-20 right-20 w-14 h-14 bg-red'></span>
            )}
            <div className='flex items-end justify-between w-full gap-10'>
              <p className='font-bold text-20'>{chattingRoom.cafe_name}</p>
              <span className='font-normal text-12'>
                {getTime(chattingRoom.last_chat_date)}
              </span>
            </div>
            <p className='font-light text-16'>{chattingRoom.last_chat}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChattingRoomList;
