import { useAtom } from 'jotai';
import { Link } from 'react-router-dom';

import { setChattingName, setChattingRoomId } from '../../atoms/chatting';
import { ChattingRoomTypes } from '../../types/chatting';
import { getChatTime } from '../../utils/time.utils';

interface ChattingRoomListPropsTypes {
  rooms: ChattingRoomTypes[];
}

const ChattingRoomList: React.FC<ChattingRoomListPropsTypes> = ({ rooms }) => {
  const [, setChattingRoomIdAtom] = useAtom(setChattingRoomId);
  const [, setChattingNameAtom] = useAtom(setChattingName);

  const handleSelectChattingRoom = (id: number, name: string) => {
    setChattingRoomIdAtom(id);
    setChattingNameAtom(name);
  };

  return (
    <ul>
      {rooms.map(room => (
        <li
          key={room.chat_room_id}
          onClick={() => handleSelectChattingRoom(room.chat_room_id, room.name)}
          className='relative w-full p-20 border-b-2 cursor-pointer border-light-gray'
        >
          <Link to={`/chatting/room`} className='block w-full h-full'>
            {!room.status && (
              <span className='absolute rounded-full bottom-20 right-20 w-14 h-14 bg-red'></span>
            )}
            <div className='flex items-end justify-between w-full gap-10'>
              <p className='font-bold text-20'>{room.name}</p>
              <span className='font-normal text-12'>
                {room.last_chat_date && getChatTime(room.last_chat_date)}
              </span>
            </div>
            <p className='font-light text-16'>{room.last_chat}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChattingRoomList;
