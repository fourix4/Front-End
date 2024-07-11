import { useEffect, useState } from 'react';
import { SeatPriceTypes } from '../../types/interfaces';

interface BookingSeatModalPropTypes {
  usageFee: SeatPriceTypes[];
  selectedSeat: {
    type: string;
    id: number;
  };
}

const BookingSeatModal: React.FC<BookingSeatModalPropTypes> = ({
  usageFee,
  selectedSeat,
}) => {
  const [selectedPrice, setSelectedPrice] = useState(0);

  const priceClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
  ) => {
    e.preventDefault();

    setSelectedPrice(price);
  };

  useEffect(() => {
    setSelectedPrice(0);
  }, [selectedSeat]);

  return (
    <>
      {usageFee.map((fee, i) => (
        <div key={i} className='w-1/2 h-80 p-10'>
          <button
            onClick={e => priceClick(e, fee.price)}
            className={`w-full h-full border-dark-gray rounded-sm text-16 ${selectedPrice === fee.price ? 'bg-blue text-white' : 'border-[1px]'}`}
          >
            {fee.hours}시간 {fee.price.toLocaleString()}원
          </button>
        </div>
      ))}
    </>
  );
};

export default BookingSeatModal;
