import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getManagementInfo } from '../../apis/api/manager';
import { getCafeInfoData } from '../../apis/services/manager';
import ManagementCafeInfo from '../../components/ManagementCafeInfo/ManagementCafeInfo';
import Topbar from '../../components/Topbar/Topbar';
import { CafeInfoTypes } from '../../types/management';

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
        {cafeInfo && <ManagementCafeInfo cafeInfo={cafeInfo} />}
      </div>
    </>
  );
};

export default ManagementDetailPage;
