import { SeatPriceTypes } from '../../types/interfaces';

interface BookingSeatModalPropTypes {
  usageFee: SeatPriceTypes[];
  priceClick: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    price: number,
    hours: number,
  ) => void;
  seatPrice: number;
}

const BookingSeatModal: React.FC<BookingSeatModalPropTypes> = ({
  usageFee,
  priceClick,
  seatPrice,
}) => {
  return (
    <>
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
    </>
  );
};

export default BookingSeatModal;
