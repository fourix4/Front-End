import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../apis/api/user';
import { getUserInfo } from '../../apis/services/user';
import { ACCESS_TOKEN, ROLE, ROUTE } from '../../config/constants';

const RedirectionPage = () => {
  const accessToken = new URL(document.location.toString()).searchParams.get(
    ACCESS_TOKEN,
  );

  const [role, setRole] = useState(ROLE.USER);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!accessToken) {
      alert('로그인 실패');
    } else {
      localStorage.setItem(ACCESS_TOKEN, accessToken);
    }

    (async () => {
      const rawData = await getUser();
      const { author } = getUserInfo(rawData);

      setRole(author);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      {loading ? (
        <p>로딩</p>
      ) : (
        <>
          {role === ROLE.USER && <Navigate to={ROUTE.HOME} replace />}
          {role === ROLE.MANAGER && <Navigate to={ROUTE.MANAGEMENT} />}
        </>
      )}
    </div>
  );
};

export default RedirectionPage;
