import { SeatPriceTypes } from '../../types/interfaces';

interface BookingSeatModalPropTypes {
  usageFee: SeatPriceTypes[];
}

const BookingSeatModal: React.FC<BookingSeatModalPropTypes> = ({
  usageFee,
}) => {
  return (
    <>
      {usageFee.map((fee, i) => (
        <div key={i} className='w-1/2 h-80 p-10'>
          <button className='w-full h-full border-[1px] border-dark-gray rounded-sm text-16'>
            {fee.hours}시간 {fee.price.toLocaleString()}원
          </button>
        </div>
      ))}
    </>
  );
};

export default BookingSeatModal;
