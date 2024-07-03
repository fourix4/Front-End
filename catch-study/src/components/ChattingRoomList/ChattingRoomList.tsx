import { CHATTING_ROOM_LISTS } from '../../config/constants';

const ChattingRoomList: React.FC = () => {
  return (
    <ul>
      {CHATTING_ROOM_LISTS.map(chattingRoom => (
        <li
          key={chattingRoom.chattingRoomId}
          className='relative w-full p-20 border-b-2 cursor-pointer border-light-gray'
        >
          {!chattingRoom.isRead && (
            <span className='absolute rounded-full bottom-20 right-20 w-14 h-14 bg-red'></span>
          )}
          <div className='flex items-end justify-between w-full gap-10'>
            <p className='font-bold text-20'>{chattingRoom.cafeName}</p>
            <span className='font-normal text-12'>
              {chattingRoom.lastChattingContentTime}
            </span>
          </div>
          <p className='font-light text-16'>
            {chattingRoom.lastChattingContent}
          </p>
        </li>
      ))}
    </ul>
  );
};

export default ChattingRoomList;
