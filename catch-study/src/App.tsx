import { Route, Routes } from 'react-router-dom';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import ChattingRoomPage from './pages/ChattingRoom/ChattingRoomPage';
import MainPage from './pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/chatting' element={<ChattingPage />} />
        <Route path='/chatting/:chattingId' element={<ChattingRoomPage />} />
      </Routes>
    </>
  );
};

export default App;
