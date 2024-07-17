import { useEffect, useState } from 'react';
import {
  SeatPriceTypes,
  SeatsTypes,
  StudycafeTypes,
} from '../../types/interfaces';

interface BookingSeatModalPropTypes {
  isOpen: boolean;
  selectedType: {
    type: string;
    id: number;
  };
  closeModal: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  studycafeInfo: StudycafeTypes;
  usageFee: SeatPriceTypes[];
  selectedSeat: SeatsTypes;
}

const BookingSeatModal: React.FC<BookingSeatModalPropTypes> = ({
  isOpen,
  usageFee,
  selectedType,
  closeModal,
  selectedSeat,
}) => {
  const [seatPrice, setseatPrice] = useState(0);
  const [selectedSeatHours, setSeletedSeatHours] = useState(0);

  console.log(selectedSeatHours, selectedSeat);

  useEffect(() => {
    setseatPrice(0);
  }, [selectedType]);

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

    // if (!seatPrice && selectedStartTime === '시작 시간') {
    //   alert('시간을 선택해주세요');
    //   return;
    // }

    // const key = {
    //   ...studycafeInfo,
    //   ...selectedSeat,
    //   seatPrice,
    //   seatTime: selectedSeatHours,
    //   roomPrice: roomTotalPrice,
    //   roomTime,
    //   roomStartTime: selectedStartTime,
    //   date: roomDate,
    // };

    // navigate(ROUTE.PAYMENT, { state: { key } });
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
