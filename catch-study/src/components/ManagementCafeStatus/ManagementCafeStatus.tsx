import { Link } from 'react-router-dom';
import { CafeStatusTypes } from '../../types/management';

interface ManagementCafeStatusPropsTypes {
  cafeStatus: CafeStatusTypes;
}

const ManagementCafeStatus: React.FC<ManagementCafeStatusPropsTypes> = ({
  cafeStatus,
}) => {
  return (
    <div className='relative w-full p-20 border-2 rounded-sm border-light-gray sm:w-smWeb lg:w-lgWeb bg-bright-gray'>
      <h1 className='font-bold text-20'>{cafeStatus.cafe_name}</h1>
      <Link to={`/management/detail/${cafeStatus.cafe_id}`}>
        <button className='absolute p-6 bg-white border-2 text-14 text-light-gray top-10 right-10 border-light-gray rounded-default'>
          상세보기
        </button>
      </Link>

      <div className='mb-20'>
        <p>
          {cafeStatus.address.city} {cafeStatus.address.country}{' '}
          {cafeStatus.address.town} {cafeStatus.address.etc}
        </p>
      </div>
      <div className='grid grid-cols-1 gap-20 md:grid-cols-2'>
        <div>
          <h2 className='font-semibold text-17'>좌석 현황</h2>
          <p className='font-medium text-40'>
            {cafeStatus.using_seats} / {cafeStatus.seats}
          </p>
        </div>
        <div>
          <h2 className='font-semibold text-17'>매출 현황</h2>
          <p className='font-medium text-40'>{cafeStatus.sales} 원</p>
        </div>
      </div>
    </div>
  );
};

export default ManagementCafeStatus;
