import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ROUTE } from '../../config/constants';
import { isSuccessDelete } from '../../apis/services/user';
import { deleteUser } from '../../apis/api/user';

const LogoutDelete: React.FC = () => {
  const navigate = useNavigate();
  const logoutClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    localStorage.removeItem(ACCESS_TOKEN);
    navigate(ROUTE.HOME);
  };

  const deleteClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (window.confirm('정말 탈퇴하시겠습니까?')) {
      (async () => {
        const rawData = await deleteUser();

        if (isSuccessDelete(rawData)) {
          localStorage.removeItem(ACCESS_TOKEN);
          alert('삭제되었습니다.');
          navigate('/');
          return;
        }
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      })();
    }
  };

  return (
    <div className='flex m-middle items-center'>
      <button
        onClick={logoutClick}
        className='mr-100 align-middle items-center'
      >
        로그아웃
      </button>
      <button onClick={deleteClick} className='align-middle text-dark-gray'>
        회원탈퇴
      </button>
    </div>
  );
};

export default LogoutDelete;
