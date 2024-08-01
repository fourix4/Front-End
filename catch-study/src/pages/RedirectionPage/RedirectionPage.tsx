import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../apis/api/user';
import { getUserInfo } from '../../apis/services/user';
import { ACCESS_TOKEN, ROLE, ROUTE } from '../../config/constants';

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

    (async () => {
      const rawData = await getUser();
      const { author } = getUserInfo(rawData);

      if (author === ROLE.USER) {
        navigate(ROUTE.HOME);
      } else {
        navigate(ROUTE.MANAGEMENT);
      }
    })();
  }, []);

  return <div></div>;
};

export default RedirectionPage;
