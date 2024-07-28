import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCheckUser, getUser } from '../../apis/api/user';
import { getUserInfo, isAuthUser } from '../../apis/services/user';
import ChattingRoom from '../../components/ChattingRoom/ChattingRoom';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';

const ChattingRoomPage: React.FC = () => {
  const navigate = useNavigate();

  const [authChecked, setAuthChecked] = useState(false);
  const [id, setId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [roomId] = useState(sessionStorage.getItem('chattingRoomId'));
  const [chattingName] = useState(sessionStorage.getItem('chattingName'));

  useEffect(() => {
    (async () => {
      const userRawData = await getCheckUser();
      const { isAuth, message } = isAuthUser(userRawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
        return;
      }

      // 유저정보 가져오기
      const userInfoata = await getUser();
      const { userId, email: userEmail } = getUserInfo(userInfoata);

      setId(userId);
      setEmail(userEmail);
      setAuthChecked(true);
    })();
  }, [navigate]);

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Topbar />
      {authChecked && id && email && roomId && chattingName && (
        <ChattingRoom
          userId={id}
          email={email}
          roomId={roomId}
          chattingName={chattingName}
        />
      )}
    </div>
  );
};

export default ChattingRoomPage;
