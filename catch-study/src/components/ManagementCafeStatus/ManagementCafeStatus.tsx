import { Link } from 'react-router-dom';
import { CafeStatusTypes } from '../../types/management';

interface ManagementCafeStatusPropsTypes {
  cafeStatus: CafeStatusTypes;
}

const ManagementCafeStatus: React.FC<ManagementCafeStatusPropsTypes> = ({
  cafeStatus,
}) => {
  console.log(cafeStatus);

  return (
    <div>
      <h1>{cafeStatus.cafe_name} 카페 현황</h1>
      <span>
        <Link to={`/management/detail/${cafeStatus.cafe_id}`}>상세보기</Link>
      </span>
      <div>
        <h2>주소</h2>
        <p>
          {cafeStatus.address.city} {cafeStatus.address.country}{' '}
          {cafeStatus.address.town} {cafeStatus.address.etc}
        </p>
      </div>
      <div>
        <h2>좌석 현황</h2>
        <p>
          {cafeStatus.using_seats} / {cafeStatus.seats}
        </p>
      </div>
      <div>
        <h2>매출 현황</h2>
        <p>{cafeStatus.sales}</p>
      </div>
    </div>
  );
};

export default ManagementCafeStatus;
