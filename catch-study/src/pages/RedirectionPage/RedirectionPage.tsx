import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, ROUTE } from '../../config/constants';

const RedirectionPage = () => {
  const navigate = useNavigate();
  const accessToken = new URL(document.location.toString()).searchParams.get(
    ACCESS_TOKEN,
  );

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 실패');
    } else {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }

    navigate(ROUTE.HOME);
  }, []);

  return <div></div>;
};

export default RedirectionPage;
