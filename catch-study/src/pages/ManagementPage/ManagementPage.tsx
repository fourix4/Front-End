import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getManagementInfo } from '../../apis/api/manager';
import {
  getCafeInfoData,
  isSuccessCafeInfo,
} from '../../apis/services/manager';
import ManagementCafeInfo from '../../components/ManagementCafeInfo/ManagementCafeInfo';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import useAuthCheck from '../../hooks/useAuthCheck';
import { CafeInfoTypes } from '../../types/management';

const ManagementPage: React.FC = () => {
  useAuthCheck();

  const navigate = useNavigate();

  const [cafeInfo, setCafeInfo] = useState<CafeInfoTypes>();
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    (async () => {
      const rawData = await getManagementInfo();

      if (!isSuccessCafeInfo(rawData)) {
        alert(rawData.message);
      }

      const data = getCafeInfoData(rawData);

      console.log('조회', data);

      if (data) {
        setCafeInfo(data);
        setIsExist(true);
      }
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
