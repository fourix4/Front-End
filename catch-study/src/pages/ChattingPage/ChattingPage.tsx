import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChattingRoom } from '../../apis/api/chatting';
import { getCheckUser } from '../../apis/api/user';
import { getChattingRoomData } from '../../apis/services/chatting';
import { isAuthUser } from '../../apis/services/user';
import ChattingRoomList from '../../components/ChattingRoomList/ChattingRoomList';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import ChattingListSkeleton from '../../skeleton/ChattingListSkeleton';
import { ChattingRoomTypes } from '../../types/chatting';

const ChattingPage: React.FC = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [chattingRooms, setChattingRooms] = useState<ChattingRoomTypes[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const userRawData = await getCheckUser();
      const { isAuth, message } = isAuthUser(userRawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
        return;
      }

      setAuthChecked(true);

      const roomRawData = await getChattingRoom();
      const roomData = getChattingRoomData(roomRawData);

      setChattingRooms(roomData);
      setIsLoading(false);
    })();
  }, [navigate]);

  return (
    <>
      <Topbar />
      {isLoading ? (
        <ChattingListSkeleton />
      ) : (
        <>{authChecked && <ChattingRoomList rooms={chattingRooms} />}</>
      )}
    </>
  );
};

export default ChattingPage;
