import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { postGoogleLogin } from '../../apis/api/user';
import { getAccessToken } from '../../apis/services/user';
import { ACCESS_TOKEN } from '../../config/constants';

const GoogleRedirectionPage = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');

  useEffect(() => {
    (async () => {
      if (code) {
        const rawData = await postGoogleLogin(code);
        const accessToken = getAccessToken(rawData);

        if (accessToken) {
          localStorage.setItem(ACCESS_TOKEN, accessToken);
        } else {
          alert('로그인 실패');
        }
      }
      navigate('/');
    })();
  }, []);

  return <div></div>;
};

export default GoogleRedirectionPage;
