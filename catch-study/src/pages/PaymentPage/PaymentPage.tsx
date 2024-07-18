import { useLocation, useNavigate } from 'react-router-dom';
import Topbar from '../../components/Topbar/Topbar';
import postPayment from '../../apis/api/payment';
import getRedirectPCURL from '../../apis/services/payment';
import { ROUTE } from '../../config/constants';

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
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cafeId,
    cafeName,
    id,
    name,
    type,
    time,
    startTime,
    price,
    date,
  }: PaymentInfoTypes = location.state.key;

  const paymentClick = async () => {
    const rawData = await postPayment(
      cafeId,
      'kakaopay',
      id,
      type,
      time * 60,
      price,
      startTime,
    );
    const result = getRedirectPCURL(rawData);

    if (result) {
      navigate(result);
      return;
    }

    navigate(ROUTE.PAYMENT_SUCCESS);
    // alert('결제 실패');
  };

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
        onClick={paymentClick}
        className={`fixed bottom-0 w-full h-60 text-24 font-bold text-white bg-blue`}
      >
        결제하기
      </button>
    </>
  );
};

export default PaymentPage;
