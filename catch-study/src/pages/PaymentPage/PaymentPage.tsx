import { useLocation } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';

interface PaymentInfoTypes {
  cafeId: number;
  cafeName: string;
  id: number;
  name: string;
  type: string;
  time: number;
  startTime?: string;
  price: number;
  date: { year: number; month: number; date: number };
}

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const { cafeName, name, time, price, date }: PaymentInfoTypes =
    location.state.key;

  return (
    <>
      <Topbar />
      <div className='p-30 border-b border-light-gray [&>*]:mb-10 text-16'>
        <div>{cafeName}</div>
        <div>
          {date.year}년 {date.month}월 {date.date}일
        </div>
        <div>{name}</div>
        <div>{time}시간</div>
      </div>
      <div className='p-30 border-b border-light-gray text-right text-20 font-bold'>
        {price.toLocaleString()}원
      </div>
      <div className='p-30'>
        <div>
          <input className='w-30 h-30' type='checkbox' id='kakao' />
          <label htmlFor='kakao'>카카오페이</label>
        </div>
      </div>
      <button
        className={`fixed bottom-0 w-full h-60 text-24 font-bold text-white bg-blue`}
      >
        결제하기
      </button>
    </>
  );
};

export default PaymentPage;
