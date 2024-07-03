import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RedirectionPage from './pages/RedirectionPage/RedirectionPage';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/oauthkakao' element={<RedirectionPage />} />
      </Routes>
    </>
  );
};

export default App;
