import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SeatPriceTypes,
  SeatsTypes,
  StudycafeTypes,
} from '../../types/interfaces';
import { ROUTE, SEAT_TYPE } from '../../config/constants';

interface BookingSeatModalPropTypes {
  isOpen: boolean;
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  usageFee: SeatPriceTypes[];
  studycafeInfo: StudycafeTypes;
  selectedSeat: SeatsTypes;
}

const BookingSeatModal: React.FC<BookingSeatModalPropTypes> = ({
  isOpen,
  closeModal,
  usageFee,
  studycafeInfo,
  selectedSeat,
}) => {
  const navigate = useNavigate();
  const [seatPrice, setseatPrice] = useState(0);
  const [selectedSeatHours, setSeletedSeatHours] = useState(0);

  useEffect(() => {
    setseatPrice(0);
  }, [selectedSeat]);

  const priceClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    hours: number,
  ) => {
    e.preventDefault();

    setseatPrice(price);
    setSeletedSeatHours(hours);
  };

  const paymentClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!seatPrice) {
      alert('시간을 선택해주세요');
      return;
    }

    const date = new Date();

    const key = {
      ...studycafeInfo,
      id: selectedSeat.seat_id,
      name: selectedSeat.seat_number,
      type: SEAT_TYPE.SEAT,
      time: selectedSeatHours,
      price: seatPrice,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
      },
    };

    navigate(ROUTE.PAYMENT, { state: { key } });
  };

  return (
    <>
      <div
        className={`fixed bottom-0 min-w-[300px] w-full rounded-t-default shadow-modal bg-white ${isOpen ? 'visible' : 'invisible'} duration-300 ease-out ${isOpen ? 'h-modal' : 'h-0'}`}
      >
        <div className='h-490 p-30'>
          <div className='relative'>
            <div className='h-6 mb-20 w-50 rounded-default bg-light-gray m-middle'></div>
            <button
              onClick={closeModal}
              className='absolute w-24 h-24 bg-center bg-no-repeat bg-close right-0 inset-y-1/2 translate-y-[-50%]'
            ></button>
          </div>
          <div className='mb-20 font-bold text-center text-20'>
            날짜/시간 선택
          </div>
          <div className='flex w-full max-h-[85%] overflow-auto flex-wrap'>
            {usageFee.map((fee, i) => (
              <div key={i} className='w-1/2 p-10 h-80'>
                <button
                  onClick={e => priceClick(e, fee.price, fee.hours)}
                  className={`w-full h-full border-dark-gray rounded-sm text-16 ${seatPrice === fee.price ? 'bg-blue text-white' : 'border-[1px]'}`}
                >
                  {fee.hours}시간 {fee.price.toLocaleString()}원
                </button>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={paymentClick}
          className={`w-full h-60 text-24 font-bold text-white bg-blue`}
        >
          결제하기
        </button>
      </div>
    </>
  );
};

export default BookingSeatModal;