import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../apis/api/user';
import isSuccessLogin from '../../apis/services/user';
import { ROUTE } from '../../config/constants';

const RedirectionPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const rawData = await postLogin();

      if (!isSuccessLogin(rawData)) {
        alert('로그인 실패');
      }
    })();

    navigate(ROUTE.HOME);
  }, []);

  return <div></div>;
};

export default RedirectionPage;
