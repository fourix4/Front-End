import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { ACCESS_TOKEN, ROUTE } from '../../config/constants';
import { deleteUser, getUser } from '../../apis/api/user';
import isSuccessDelete, { getUserInfo } from '../../apis/services/user';
import Topbar from '../../components/Topbar/Topbar';
import BookingHistory from '../../components/BookingHistory/BookingHistory';

interface UserInfoTypes {
  userName: string;
  email: string;
}

const MyPage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<UserInfoTypes>({
    userName: '',
    email: '',
  });

  useEffect(() => {
    (async () => {
      const rawData = await getUser();
      const data = getUserInfo(rawData);

      setUserInfo(data);
    })();
  }, []);

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
    <>
      <Topbar />
      <div>
        <div className=''>
          <div className='p-20 border-b border-light-gray'>
            <p className='mb-10 text-20'>{userInfo.userName}</p>
            <p className='text-dark-gray'>{userInfo.email}</p>
          </div>
          <div className='p-20 border-b border-light-gray bg-bright-gray'>
            <p className='text-20 font-bold mb-10'>예약 내역</p>
            <div className='flex justify-between items-end'>
              <p className='text-12'>최근 30개</p>
              <input className='border border-light-gray rounded-[5px]' />
            </div>
          </div>
          <div className='min-h-300 h-600 overflow-y-auto'>
            <BookingHistory />
          </div>
        </div>
        <div className='flex h-50'>
          <div className='flex m-middle items-center'>
            <button
              onClick={logoutClick}
              className='mr-100 align-middle items-center'
            >
              로그아웃
            </button>
            <button
              onClick={deleteClick}
              className='align-middle text-dark-gray'
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
