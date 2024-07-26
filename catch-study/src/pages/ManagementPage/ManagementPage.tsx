import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getManagementInfo } from '../../apis/api/manager';
import { getCheckUser, getUser } from '../../apis/api/user';
import isExistCafeInfo from '../../apis/services/manager';
import { getUserInfo, isAuthUser } from '../../apis/services/user';
import ManagementCafeInfo from '../../components/ManagementCafeInfo/ManagementCafeInfo';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import { FormDataTypes } from '../../types/management';

const ManagementPage: React.FC = () => {
  const navigate = useNavigate();

  const [cafeInfo, setCafeInfo] = useState<FormDataTypes>();
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    (async () => {
      // 로그인 확인
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

      if (author === 'roleUser') {
        alert('관리자 아이다로 로그인 해주세요.');
        navigate(ROUTE.HOME);
        return;
      }

      const rawData = await getManagementInfo();

      if (isExistCafeInfo(rawData)) {
        setIsExist(true);
        return;
      }
      setCafeInfo(rawData.result as FormDataTypes);
    })();
  }, [navigate]);

  return (
    <>
      <Topbar />
      <div className='flex flex-col items-center w-full h-full gap-20 p-20'>
        {isExist && cafeInfo ? (
          <ManagementCafeInfo cafeInfo={cafeInfo} />
        ) : (
          <div className='w-full sm:w-smWeb lg:w-lgWeb'>
            <Link to={ROUTE.MANAGEMENT_FORM}>
              <button className='input-box'>스터디 카페 정보 입력</button>
            </Link>
          </div>
        )}
        <div className='w-full sm:w-smWeb lg:w-lgWeb'>
          <Link to={ROUTE.CHATTING}>
            <button className='input-box'>채팅</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
