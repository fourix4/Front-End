import { useLocation } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
// import { SEAT_TYPE } from '../../config/constants';

// interface PaymentInfoTypes {
//   cafeId: number;
//   cafeName: string;
//   type: string;
//   id: number;
//   name: string;
//   seatPrice: number;
//   seatTime: number;
//   roomPrice: number;
//   roomTime: number;
//   roomStartTime: string;
//   date: { year: number; month: number; date: number };
// }

const PaymentPage: React.FC = () => {
  const location = useLocation();

  console.log(location.state.key);

  return (
    <>
      <Topbar />
      {/* <div className='p-30 border-b border-dark-gray [&>*]:mb-10 text-16'>
        <div>{cafeName}</div>
        <div>
          {date.year}년 {date.month}월 {date.date}일
        </div>
        <div>좌석 번호 </div>
        <div>{type === SEAT_TYPE.ROOM ? roomTime : seatTime}시간</div>
      </div>
      <div className='p-30 border-b border-dark-gray text-right text-20 font-bold'>
        {type === SEAT_TYPE.ROOM
          ? roomPrice.toLocaleString()
          : seatPrice.toLocaleString()}
        원
      </div>
      <div className='p-30'>
        <label>
          <input
            id='checkbox'
            type='checkbox'
            name='kakaopay'
            value='kakaopay'
          />
          카카오페이
        </label>
      </div> */}
    </>
  );
};

export default PaymentPage;
