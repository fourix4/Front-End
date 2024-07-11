import { Route, Routes } from 'react-router-dom';
import { ROUTE } from './config/constants';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import ChattingRoomPage from './pages/ChattingRoomPage/ChattingRoomPage';
import LoginPage from './pages/LoginPage/LoginPage';
import MainPage from './pages/MainPage/MainPage';
import ManagementInfo from './pages/ManagementInfoPage/ManagementInfo';
import ManagementPage from './pages/ManagementPage/ManagementPage';
import MyPage from './pages/MyPage/MyPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';
import StudycafeBookingPage from './pages/StudycafeBookingPage/StudycafeBookingPage';

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
        <Route path={ROUTE.MANAGEMENT} element={<ManagementPage />} />
        <Route path={ROUTE.MANAGEMENT_INFO} element={<ManagementInfo />} />
        <Route
          path={ROUTE.STUDYCAFE_BOOKING}
          element={<StudycafeBookingPage />}
        />
      </Routes>
    </>
  );
};

export default App;
