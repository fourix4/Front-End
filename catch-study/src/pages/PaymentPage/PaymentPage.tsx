import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Topbar from '../../components/Topbar/Topbar';
import { PAYMENT_TYPE, ROUTE } from '../../config/constants';
import postPayment from '../../apis/api/payment';
import getRedirectPCURL from '../../apis/services/payment';
import kakaoPayment from '../../assets/kakao_payment.svg';

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

const images = [kakaoPayment];

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
  const [isChecked, setIsChecked] = useState(true);
  const [checkedPayment, setCheckedPayment] = useState(PAYMENT_TYPE[0]);

  const paymentClick = async () => {
    if (!isChecked) {
      alert('결제 방식을 선택해주세요');
      return;
    }

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

  const checkboxChange = (
    _: React.ChangeEvent<HTMLInputElement>,
    paymentType: string,
  ) => {
    if (!isChecked) {
      setIsChecked(true);
      setCheckedPayment(paymentType);
    }

    if (isChecked && checkedPayment === paymentType) {
      setIsChecked(false);
    }
  };

  return (
    <>
      <Topbar />
      <input className='border' type='checkbox' />
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
        {PAYMENT_TYPE.map((paymentType, i) => (
          <div
            key={paymentType}
            className='[&>*]:align-middle [&>*]:cursor-pointer text-16'
          >
            <input
              className={`w-15 h-15 mr-10 rounded-full ${isChecked && checkedPayment === paymentType ? 'border-blue border-4' : 'border border-light-gray'}`}
              type='checkbox'
              id={paymentType}
              checked={isChecked && checkedPayment === paymentType}
              onChange={e => checkboxChange(e, paymentType)}
            />
            <img src={images[i]} className='inline-block mr-10' />
            <label htmlFor={paymentType}>{paymentType}</label>
          </div>
        ))}
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
