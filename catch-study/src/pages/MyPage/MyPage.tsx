import { useNavigate } from 'react-router';
import { ACCESS_TOKEN, ROUTE } from '../../config/constants';

const MyPage: React.FC = () => {
  const navigate = useNavigate();

  const logoutClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(ROUTE.HOME);
  };

  return (
    <div>
      <button onClick={logoutClick}>로그아웃</button>
    </div>
  );
};

export default MyPage;
