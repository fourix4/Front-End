import { Route, Routes } from 'react-router-dom';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import ChattingRoomPage from './pages/ChattingRoomPage/ChattingRoomPage';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';
import MyPage from './pages/MyPage/MyPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauthkakao' element={<RedirectionPage />} />
        <Route path='/chatting' element={<ChattingPage />} />
        <Route path='/chatting/:chattingId' element={<ChattingRoomPage />} />
        <Route path='/mypage' element={<MyPage />} />
      </Routes>
    </>
  );
};

export default App;
