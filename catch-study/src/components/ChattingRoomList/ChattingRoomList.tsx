import { Link } from 'react-router-dom';
import { CHATTING_ROOM_LISTS } from '../../config/constants';

const ChattingRoomList: React.FC = () => {
  return (
    <ul>
      {CHATTING_ROOM_LISTS.map(chattingRoom => (
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
                {chattingRoom.last_chat_date}
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
