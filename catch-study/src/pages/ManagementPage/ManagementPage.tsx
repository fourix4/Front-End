import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ManagementCafeInfo from '../../components/ManagementCafeInfo/ManagementCafeInfo';
import Topbar from '../../components/Topbar/Topbar';
import { ROUTE } from '../../config/constants';
import { FormDataTypes } from '../../types/management';

const ManagementPage: React.FC = () => {
  const [cafeInfo, setCafeInfo] = useState<FormDataTypes>({
    cafe_name: '이지 스터디',
    address: {
      city: '서울시',
      country: '강남구',
      town: '논현동',
      etc: '123번지-1',
    },
    opening_hours: '10:00',
    closed_hours: '20:00',
    closed_day: '',
    seats: 40,
    room_info: [
      {
        cancel_available_time: 30,
        rooms: [
          { name: 'A', capacity: 2, price: 2000 },
          { name: 'B', capacity: 4, price: 4000 },
        ],
      },
    ],
    usage_fee: [
      { hours: 1, price: 2000 },
      { hours: 2, price: 4000 },
      { hours: 5, price: 5000 },
    ],
    title_image: '',
    multiple_images: [],
    seatChart_image: '',
    cafe_phone: '',
  });
  const [isExist, setIsExist] = useState(true);

  useEffect(() => {
    // (async () => {
    //   const rawData = await getManagementInfo();
    //   console.log(rawData);
    //   if (isExistCafeInfo(rawData)) {
    //     setIsExist(true);
    //     return;
    //   }
    //   setCafeInfo(rawData.result as FormDataTypes);
    // })();
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
