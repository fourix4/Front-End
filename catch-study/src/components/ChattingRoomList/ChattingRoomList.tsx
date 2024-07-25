import { useSetAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getChattingRoom } from '../../apis/api/chatting';
import { getCheckUser } from '../../apis/api/user';
import { getChattingRoomData } from '../../apis/services/chatting';
import { isAuthUser } from '../../apis/services/user';
import { cafeName } from '../../atoms/cafeName';
import { chattingRoomId } from '../../atoms/chatting';
import { ROUTE } from '../../config/constants';
import { ChattingRoomTypes } from '../../types/chatting';
import { getTime } from '../../utils/time.utils';

const ChattingRoomList: React.FC = () => {
  const navigate = useNavigate();

  const setChattingRoomId = useSetAtom(chattingRoomId);
  const setCafeName = useSetAtom(cafeName);

  const [chattingRooms, setChattingRooms] = useState<ChattingRoomTypes[]>([]);

  const handleSelectChattingRoom = (id: number, name: string) => {
    setChattingRoomId(id);
    setCafeName(name);
  };

  useEffect(() => {
    (async () => {
      const userRawData = await getCheckUser();
      const { isAuth, message } = isAuthUser(userRawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
        return;
      }

      const roomRawData = await getChattingRoom();
      const roomData = getChattingRoomData(roomRawData);

      setChattingRooms(roomData);
    })();
  }, []);

  return (
    <ul>
      {chattingRooms.map(chattingRoom => (
        <li
          key={chattingRoom.chat_room_id}
          onClick={() =>
            handleSelectChattingRoom(
              chattingRoom.chat_room_id,
              chattingRoom.cafe_name,
            )
          }
          className='relative w-full p-20 border-b-2 cursor-pointer border-light-gray'
        >
          <Link to={`/chatting/room`} className='block w-full h-full'>
            {!chattingRoom.status && (
              <span className='absolute rounded-full bottom-20 right-20 w-14 h-14 bg-red'></span>
            )}
            <div className='flex items-end justify-between w-full gap-10'>
              <p className='font-bold text-20'>{chattingRoom.cafe_name}</p>
              <span className='font-normal text-12'>
                {chattingRoom.last_chat_date &&
                  getTime(chattingRoom.last_chat_date)}
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
