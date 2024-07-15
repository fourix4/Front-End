import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../apis/api/user';
import isSuccessLogin from '../../apis/services/user';
import { ROUTE } from '../../config/constants';

const RedirectionPage = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');

  useEffect(() => {
    if (!code) {
      alert('로그인 실패');
      return;
    }

    (async () => {
      const rawData = await postLogin(code);

      if (!isSuccessLogin(rawData)) {
        alert('로그인 실패');
      }
    })();

    navigate(ROUTE.HOME);
  }, []);

  return <div></div>;
};

export default RedirectionPage;
