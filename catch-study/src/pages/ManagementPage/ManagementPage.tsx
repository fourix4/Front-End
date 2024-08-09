import { lazy, Suspense, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCafeStatus } from '../../apis/api/manager';
import { getCafeStatusData } from '../../apis/services/manager';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import useAuthCheck from '../../hooks/useAuthCheck';
import ManagementCafeStatusSkeleton from '../../skeletons/ManagementCafeStatusSkeleton';
import { CafeStatusTypes } from '../../types/management';

const ManagementCafeStatus = lazy(
  () => import('../../components/ManagementCafeStatus/ManagementCafeStatus'),
);

const ManagementPage: React.FC = () => {
  useAuthCheck();

  const navigate = useNavigate();

  const [cafeStatus, setCafeStatus] = useState<CafeStatusTypes[]>([]);

  useEffect(() => {
    (async () => {
      const rawData = await getCafeStatus();
      const data = getCafeStatusData(rawData);

      setCafeStatus(data);
    })();
  }, [navigate]);

  return (
    <>
      <Topbar />
      <div className='flex flex-col items-center w-full h-full gap-20 p-20'>
        <Suspense fallback={<ManagementCafeStatusSkeleton />}>
          {cafeStatus.map(cafe => (
            <ManagementCafeStatus key={cafe.cafe_id} cafeStatus={cafe} />
          ))}
        </Suspense>
        <div className='w-full sm:w-smWeb lg:w-lgWeb'>
          <Link to={ROUTE.MANAGEMENT_FORM}>
            <button className='input-box'>스터디 카페 정보 입력</button>
          </Link>
        </div>
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
