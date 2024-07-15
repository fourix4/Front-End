import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getManagementInfo } from '../../apis/api/manager';
import isExistCafeInfo from '../../apis/services/manager';
import ManagementCafeInfo from '../../components/ManagementCafeInfo/ManagementCafeInfo';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import { FormDataTypes } from '../../types/management';

const ManagementPage: React.FC = () => {
  const [cafeInfo, setCafeInfo] = useState<FormDataTypes>();
  const [isExist, setIsExist] = useState(false);

  useEffect(() => {
    (async () => {
      const rawData = await getManagementInfo();
      if (isExistCafeInfo(rawData)) {
        setIsExist(true);
        return;
      }
      setCafeInfo(rawData.result as FormDataTypes);
    })();
  }, [isExist, setIsExist, setCafeInfo]);

  return (
    <>
      <Topbar />
      <div className='flex flex-col items-center w-full h-full gap-20 p-20'>
        {isExist && cafeInfo ? (
          <ManagementCafeInfo cafeInfo={cafeInfo} />
        ) : (
          <div className='w-full'>
            <Link to={ROUTE.MANAGEMENT_INFO}>
              <button className='input-box'>스터디 카페 정보 입력</button>
            </Link>
          </div>
        )}
        <div className='w-full'>
          <Link to={ROUTE.CHATTING}>
            <button className='input-box'>채팅</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ManagementPage;
