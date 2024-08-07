import { lazy, Suspense, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getManagementInfo } from '../../apis/api/manager';
import { getCafeInfoData } from '../../apis/services/manager';
import Topbar from '../../components/Topbar/Topbar';
import ManagementCafeInfoSkeleton from '../../skeletons/ManagementCafeInfoSkeleton';
import { CafeInfoTypes } from '../../types/management';

const ManagementCafeInfo = lazy(
  () => import('../../components/ManagementCafeInfo/ManagementCafeInfo'),
);

const ManagementDetailPage: React.FC = () => {
  const { cafeId } = useParams<{ cafeId: string }>();
  const [cafeInfo, setCafeInfo] = useState<CafeInfoTypes>();

  useEffect(() => {
    (async () => {
      if (!cafeId) return;

      const rawData = await getManagementInfo(cafeId);
      const data = getCafeInfoData(rawData);

      if (!data) return;

      setCafeInfo(data);
    })();
  }, []);

  return (
    <>
      <Topbar />
      <div className='flex flex-col items-center w-full h-full gap-20 p-20'>
        <Suspense fallback={<ManagementCafeInfoSkeleton />}>
          {cafeInfo && <ManagementCafeInfo cafeInfo={cafeInfo} />}
        </Suspense>
      </div>
    </>
  );
};

export default ManagementDetailPage;
