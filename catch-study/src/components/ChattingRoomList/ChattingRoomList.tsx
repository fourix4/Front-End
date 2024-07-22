import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getChattingRoom } from '../../apis/api/chatting';
import { getChattingRoomData } from '../../apis/services/chatting';
import { setCafeName } from '../../atoms/cafeName';
import { setChattingRoomId } from '../../atoms/chatting';
import { ChattingRoomTypes } from '../../types/chatting';
import { getTime } from '../../utils/time.utils';

const ChattingRoomList: React.FC = () => {
  const [, setChattingRoomIdAtom] = useAtom(setChattingRoomId);
  const [, setCafeNameAtom] = useAtom(setCafeName);

  const [chattingRooms, setChattingRooms] = useState<ChattingRoomTypes[]>([]);

  const handleSelectChattingRoom = (id: number, name: string) => {
    setChattingRoomIdAtom(id);
    setCafeNameAtom(name);
  };

  useEffect(() => {
    (async () => {
      const rawData = await getChattingRoom();
      const data = getChattingRoomData(rawData);

      setChattingRooms(data);
      console.log(data);
    })();
  }, [getChattingRoomData]);

  return (
    <ul>
      {chattingRooms.map(chattingRoom => (
        <li
          key={chattingRoom.chatRoomId}
          onClick={() =>
            handleSelectChattingRoom(
              chattingRoom.chatRoomId,
              chattingRoom.cafeName,
            )
          }
          className='relative w-full p-20 border-b-2 cursor-pointer border-light-gray'
        >
          <Link to={`/chatting/room`} className='block w-full h-full'>
            {!chattingRoom.status && (
              <span className='absolute rounded-full bottom-20 right-20 w-14 h-14 bg-red'></span>
            )}
            <div className='flex items-end justify-between w-full gap-10'>
              <p className='font-bold text-20'>{chattingRoom.cafeName}</p>
              <span className='font-normal text-12'>
                {chattingRoom.lastChatDate &&
                  getTime(chattingRoom.lastChatDate)}
              </span>
            </div>
            <p className='font-light text-16'>{chattingRoom.lastChat}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ChattingRoomList;
