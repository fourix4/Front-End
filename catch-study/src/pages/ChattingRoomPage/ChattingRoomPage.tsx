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
  const [userId, setUserId] = useState<number | null>(null);
  const [email, setEmail] = useState<string | null>(null);

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
      const { userId, email } = getUserInfo(userInfoata);

      setUserId(userId);
      setEmail(email);
      setAuthChecked(true);
    })();
  }, [navigate]);

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <Topbar />
      {authChecked && userId && email && (
        <ChattingRoom userId={userId} email={email} />
      )}
    </div>
  );
};

export default ChattingRoomPage;
