import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCheckUser, getUser } from '../apis/api/user';
import { getUserInfo, isAuthUser } from '../apis/services/user';
import { ROLE, ROUTE } from '../config/constants';

const useAuthCheck = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const checkRawData = await getCheckUser();
      const { isAuth, message } = isAuthUser(checkRawData);

      if (!isAuth) {
        alert(message);
        navigate(ROUTE.HOME);
        return;
      }

      // 권한 확인
      const userRawData = await getUser();
      const { author } = getUserInfo(userRawData);

      if (author !== ROLE.MANAGER) {
        alert('관리자 아이디로 로그인 해주세요.');
        navigate(ROUTE.HOME);
      }
    })();
  }, [navigate]);
};

export default useAuthCheck;
