import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, postGoogleLogin } from '../../apis/api/user';
import { getAccessToken, getUserInfo } from '../../apis/services/user';
import { ACCESS_TOKEN, ROLE, ROUTE } from '../../config/constants';

const GoogleRedirectionPage = () => {
  const navigate = useNavigate();
  const code = new URL(document.location.toString()).searchParams.get('code');

  useEffect(() => {
    (async () => {
      if (code) {
        const rawLoginData = await postGoogleLogin(code);
        const accessToken = getAccessToken(rawLoginData);

        if (accessToken) {
          localStorage.setItem(ACCESS_TOKEN, accessToken);

          const rawAuthorData = await getUser();
          const data = getUserInfo(rawAuthorData);

          if (data && data.author === ROLE.USER) {
            navigate(ROUTE.HOME);
          } else {
            navigate(ROUTE.MANAGEMENT);
          }
        } else {
          alert('로그인 실패');
        }
      }
      navigate(ROUTE.HOME);
    })();
  }, []);

  return <div></div>;
};

export default GoogleRedirectionPage;
