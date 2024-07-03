import { Route, Routes } from 'react-router-dom';
import ChattingPage from './pages/ChattingPage/ChattingPage';
import MainPage from './pages/MainPage/MainPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/chatting' element={<ChattingPage />} />
      </Routes>
    </>
  );
};

export default App;
