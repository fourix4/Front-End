import { Route, Routes } from 'react-router-dom';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import ChattingRoomPage from './pages/ChattingRoomPage/ChattingRoomPage';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';
import MyPage from './pages/MyPage/MyPage';
import { ROUTE } from './config/constants';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path={ROUTE.HOME} element={<MainPage />} />
        <Route path={ROUTE.LOGIN} element={<LoginPage />} />
        <Route path={ROUTE.KAKAO_REDIRECT} element={<RedirectionPage />} />
        <Route path={ROUTE.CHATTING} element={<ChattingPage />} />
        <Route path={ROUTE.CHATTING_ROOM} element={<ChattingRoomPage />} />
        <Route path={ROUTE.MYPAGE} element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
